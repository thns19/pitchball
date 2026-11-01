(function () {
  const WIDTH = 1600;
  const LEFT = 84;
  const LABEL_WIDTH = 330;
  const PLOT_LEFT = LEFT + LABEL_WIDTH;
  const PLOT_WIDTH = 880;
  const VALUE_LEFT = PLOT_LEFT + PLOT_WIDTH + 30;
  const TEXT_COLOR = '#30201a';
  const MUTED_COLOR = '#775b4c';
  const TRACK_COLOR = 'rgba(125, 68, 28, 0.15)';
  const background = new Image();
  const backgroundUrl = new URL('../news/bg.png', window.location.href);
  background.src = window.PSL_EXPORT_BACKGROUND_DATA || backgroundUrl.href;
  let downloadUrl = null;
  let downloadLink = null;
  const style = document.createElement('style');
  style.textContent = '.simulation-export-button,.simulation-export-download{display:inline-flex;align-items:center;gap:8px;margin:12px 8px 12px 0;padding:10px 15px;border:1px solid #bd3215;border-radius:8px;background:#bd3215;color:#fff8e8;font:600 13px Arial,sans-serif;cursor:pointer;text-decoration:none}.simulation-export-button:hover,.simulation-export-download:hover{background:#96270f;border-color:#96270f}.simulation-export-button:focus-visible,.simulation-export-download:focus-visible{outline:2px solid #30201a;outline-offset:3px}.simulation-export-download{background:rgba(255,249,235,.92);color:#762914}.simulation-export-button:not(.simulation-export-authorized),.simulation-export-download:not(.simulation-export-authorized){display:none!important}';
  document.head.appendChild(style);

  function isExportAdmin() {
    if (typeof isPslAdmin === 'function') return Boolean(isPslAdmin());
    if (typeof cupIsAdmin !== 'undefined') return Boolean(cupIsAdmin);
    if (typeof pslCurrentUser !== 'undefined') return Boolean(pslCurrentUser && pslCurrentUser.isAdmin);
    return false;
  }

  function updateExportControls() {
    const authorized = isExportAdmin();
    document.querySelectorAll('.simulation-export-button,.simulation-export-download').forEach(button => {
      button.classList.toggle('simulation-export-authorized', authorized);
    });
  }

  updateExportControls();
  new MutationObserver(updateExportControls).observe(document.body, {childList: true, subtree: true});

  function roundedRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
    context.fill();
  }

  function downloadSimulationPng({title, subtitle, items, scaleMax, footer}) {
    if (!isExportAdmin()) {
      alert('Only administrators can export simulation PNGs.');
      return;
    }
    if (!Array.isArray(items) || items.length === 0) {
      alert('There are no simulation results to export yet.');
      return;
    }
    if (!background.complete || !background.naturalWidth) {
      console.error('Simulation export background is not ready.');
      alert('The export background image could not be loaded. Please reload the page and try again.');
      return;
    }

    const maxValue = Number.isFinite(scaleMax) && scaleMax > 0
      ? scaleMax
      : Math.max(1, ...items.map(item => Number(item.value) || 0));
    const rowHeight = 92;
    const sectionHeight = 52;
    const chartTop = 278;
    let currentSection = null;
    const chartRows = [];
    items.forEach(item => {
      if (item.section && item.section !== currentSection) {
        chartRows.push({type: 'section', label: item.section});
        currentSection = item.section;
      }
      chartRows.push({type: 'item', item});
    });
    const chartContentHeight = items.length * rowHeight
      + chartRows.filter(row => row.type === 'section').length * sectionHeight;
    const height = chartTop + chartContentHeight + 112;
    const pixelScale = Math.min(1, Math.sqrt(4000000 / (WIDTH * height)));
    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(WIDTH * pixelScale);
    canvas.height = Math.floor(height * pixelScale);
    const context = canvas.getContext('2d');
    if (!context) {
      alert('Your browser could not create the PNG export.');
      return;
    }
    context.scale(pixelScale, pixelScale);

    const imageScale = Math.max(WIDTH / background.width, height / background.height);
    const imageWidth = background.width * imageScale;
    const imageHeight = background.height * imageScale;
    context.drawImage(
      background,
      (WIDTH - imageWidth) / 2,
      (height - imageHeight) / 2,
      imageWidth,
      imageHeight
    );
    try {
      context.getImageData(0, 0, 1, 1);
    } catch (error) {
      console.error('Simulation export background cannot be read by the canvas.', error);
      alert('The export background image could not be embedded in the PNG. Please check that the export background data script loaded.');
      return;
    }
    context.fillStyle = 'rgba(255, 249, 235, 0.08)';
    roundedRect(context, 56, 38, WIDTH - 112, 132, 20);
    context.fillStyle = 'rgba(255, 249, 235, 0.08)';
    roundedRect(context, 56, 186, WIDTH - 112, height - 250, 18);

    context.textBaseline = 'middle';
    context.fillStyle = TEXT_COLOR;
    context.font = '700 46px Arial, sans-serif';
    context.fillText(title || 'Simulation results', LEFT, 75);
    context.fillStyle = MUTED_COLOR;
    context.font = '24px Arial, sans-serif';
    context.fillText(subtitle || '', LEFT, 124);

    context.font = '20px Arial, sans-serif';
    context.fillStyle = '#9b3218';
    context.fillText('TEAM / RESULT', LEFT, 220);
    context.fillText('CHANCE / SCORE', PLOT_LEFT, 220);

    context.save();
    context.setLineDash([7, 7]);
    context.strokeStyle = 'rgba(125, 68, 28, 0.34)';
    context.lineWidth = 2;
    [0, 0.5, 1].forEach(fraction => {
      const x = PLOT_LEFT + PLOT_WIDTH * fraction;
      context.beginPath();
      context.moveTo(x, 244);
      context.lineTo(x, chartTop + chartContentHeight - 12);
      context.stroke();
    });
    context.restore();

    context.font = '18px Arial, sans-serif';
    context.fillStyle = MUTED_COLOR;
    [0, 0.5, 1].forEach(fraction => {
      const x = PLOT_LEFT + PLOT_WIDTH * fraction;
      context.textAlign = fraction === 0 ? 'left' : fraction === 1 ? 'right' : 'center';
      context.fillText(`${Math.round(maxValue * fraction)}${maxValue === 100 ? '%' : ''}`, x, 256);
    });
    context.textAlign = 'left';

    let rowY = chartTop;
    chartRows.forEach(row => {
      if (row.type === 'section') {
        context.fillStyle = '#9b3218';
        context.font = '700 23px Arial, sans-serif';
        context.fillText(row.label.toUpperCase(), LEFT, rowY + 17);
        context.strokeStyle = 'rgba(125, 68, 28, 0.42)';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(LEFT, rowY + 40);
        context.lineTo(WIDTH - LEFT, rowY + 40);
        context.stroke();
        rowY += sectionHeight;
        return;
      }

      const {item} = row;
      const y = rowY;
      const value = Math.max(0, Math.min(maxValue, Number(item.value) || 0));
      const barWidth = PLOT_WIDTH * value / maxValue;
      context.fillStyle = TEXT_COLOR;
      context.font = '600 23px Arial, sans-serif';
      context.fillText(String(item.label || ''), LEFT, y + 15, LABEL_WIDTH - 18);

      context.fillStyle = TRACK_COLOR;
      roundedRect(context, PLOT_LEFT, y, PLOT_WIDTH, 28, 4);
      if (barWidth > 0) {
        const barGradient = context.createLinearGradient(PLOT_LEFT, y, PLOT_LEFT + Math.max(2, barWidth), y);
        barGradient.addColorStop(0, '#ffb900');
        barGradient.addColorStop(0.52, '#ff7200');
        barGradient.addColorStop(1, '#d93616');
        context.fillStyle = barGradient;
        roundedRect(context, PLOT_LEFT, y, Math.max(2, barWidth), 28, 4);
      }

      context.fillStyle = TEXT_COLOR;
      context.font = '700 24px Arial, sans-serif';
      context.fillText(String(item.display ?? value), VALUE_LEFT, y + 14);
      if (item.detail) {
        context.fillStyle = MUTED_COLOR;
        context.font = '18px Arial, sans-serif';
        context.fillText(String(item.detail), VALUE_LEFT, y + 45, WIDTH - VALUE_LEFT - LEFT);
      }
      rowY += rowHeight;
    });

    const footerY = chartTop + chartContentHeight + 32;
    context.fillStyle = MUTED_COLOR;
    context.font = '17px Arial, sans-serif';
    context.fillText(footer || 'Bars show the result on a transparent background.', LEFT, footerY);
    context.textAlign = 'right';
    context.fillText(new Date().toLocaleDateString(), WIDTH - LEFT, footerY);
    context.textAlign = 'left';

    try {
      const exportButton = document.activeElement instanceof HTMLButtonElement
        && document.activeElement.classList.contains('simulation-export-button')
        ? document.activeElement
        : null;
      const filename = `${String(title || 'simulation-results').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      const showDownloadLink = blob => {
        if (downloadLink) downloadLink.remove();
        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        downloadUrl = URL.createObjectURL(blob);
        downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = filename;
        downloadLink.className = 'simulation-export-download simulation-export-authorized';
        downloadLink.textContent = 'Download PNG';
        downloadLink.setAttribute('aria-label', `Download ${filename}`);
        if (exportButton?.isConnected) exportButton.insertAdjacentElement('afterend', downloadLink);
        else document.body.appendChild(downloadLink);
        downloadLink.click();
      };
      const base64 = canvas.toDataURL('image/png').split(',')[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index++) {
        bytes[index] = binary.charCodeAt(index);
      }
      showDownloadLink(new Blob([bytes], {type: 'image/png'}));
    } catch (error) {
      console.error('Simulation PNG export failed.', error);
      alert(`The simulation PNG could not be created: ${error.message || 'unknown error'}`);
    }
  }

  window.downloadSimulationPng = downloadSimulationPng;
})();
