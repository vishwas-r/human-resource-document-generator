document.addEventListener('DOMContentLoaded', () => {

  const fields = {
    companyName:    { input: 'inpCompanyName',    target: 'valCompanyName', signTarget: 'valSignCompany' },
    companySub:     { input: 'inpCompanySub',     target: 'valCompanySub' },
    refNo:          { input: 'inpRefNo',           target: 'valRefNo' },
    date:           { input: 'inpDate',            target: 'valDate' },
    empName:        { input: 'inpEmpName',         target: 'valEmpName' },
    empId:          { input: 'inpEmpId',           target: 'valEmpId', target2: 'valEmpIdSub' },
    designation:    { input: 'inpDesignation',     target: 'valDesignation' },
    department:     { input: 'inpDepartment',      target: 'valDepartment' },
    doj:            { input: 'inpDoj',             target: 'valDoj' },
    permanentAddress:{ input: 'inpPermanentAddress',target: 'valPermanentAddress' },
    landlordName:   { input: 'inpLandlordName',    target: 'valLandlordName' },
    hrEmail:        { input: 'inpHrEmail',          target: 'valHrEmail' },
    signatoryName:  { input: 'inpSignatoryName',   target: 'valSignatoryName' },
    signatoryDesig: { input: 'inpSignatoryDesig',  target: 'valSignatoryDesig' },
    signatoryDept:  { input: 'inpSignatoryDept',   target: 'valSignatoryDept' }
  };

  function iv(id) { return (document.getElementById(id)?.value || '').trim(); }

  function updateCertifyPara() {
    const empName   = iv('inpEmpName');
    const empId     = iv('inpEmpId');
    const company   = iv('inpCompanyName');
    const desig     = iv('inpDesignation');
    const dept      = iv('inpDepartment');
    const doj       = iv('inpDoj');
    const el        = document.getElementById('certifyPara');
    if (!el) return;

    let parts = ['This is to certify that'];
    if (empName) parts.push(` <strong>${empName}</strong>`);
    if (empId)   parts.push(`, bearing Employee ID <strong>${empId}</strong>`);
    parts.push(', is a full-time employee');
    if (company) parts.push(` of <strong>${company}</strong>`);
    if (desig)   parts.push(` working as <strong>${desig}</strong>`);
    if (dept)    parts.push(` in the <strong>${dept}</strong> Department`);
    if (doj)     parts.push(` since <strong>${doj}</strong>`);
    parts.push('.');
    el.innerHTML = parts.join('');
  }

  function updateRefNo() {
    const v  = iv('inpRefNo');
    const el = document.getElementById('refNoWrapper');
    if (!el) return;
    el.innerHTML = v
      ? `<strong>Ref No:</strong> <span id="valRefNo">${v}</span>`
      : '';
  }

  function updateDateWrapper() {
    const v  = iv('inpDate');
    const el = document.getElementById('dateWrapper');
    if (!el) return;
    el.innerHTML = v
      ? `<strong>Date:</strong> <span id="valDate">${v}</span>`
      : '';
  }

  function updateLandlordPara() {
    const name = iv('inpLandlordName');
    const el   = document.getElementById('landlordPara');
    if (!el) return;
    const part = name ? ` (<strong>${name}</strong>)` : '';
    el.innerHTML = `This verification letter is issued upon the request of the employee for submission to their house owner / landlord${part} for tenancy and residential verification purposes.`;
  }

  function updateHrContactPara() {
    const v  = iv('inpHrEmail');
    const el = document.getElementById('hrContactPara');
    if (!el) return;
    const part = v ? ` at <span id="valHrEmail">${v}</span>` : '';
    el.innerHTML = `Should you require any further verification or details, please feel free to contact our Human Resources Department${part}.`;
  }

  function updateSignOffTitle() {
    const company = iv('inpCompanyName');
    const el      = document.getElementById('signOffTitle');
    if (!el) return;
    el.innerHTML = company
      ? `For <span id="valSignCompany">${company}</span>`
      : '';
  }

  function updateSignatoryLine() {
    const desig = iv('inpSignatoryDesig');
    const dept  = iv('inpSignatoryDept');
    const el    = document.getElementById('valSignatoryLine');
    if (!el) return;
    if (desig && dept) el.innerText = `${desig} (${dept})`;
    else               el.innerText = desig || dept;
  }

  const plainFields = {
    companySub:      ['valCompanySub'],
    permanentAddress:['valPermanentAddress'],
    signatoryName:   ['valSignatoryName']
  };

  const helperTriggers = {
    companyName:    [updateCertifyPara, updateSignOffTitle],
    empName:        [updateCertifyPara],
    empId:          [updateCertifyPara],
    designation:    [updateCertifyPara],
    department:     [updateCertifyPara],
    doj:            [updateCertifyPara],
    refNo:          [updateRefNo],
    date:           [updateDateWrapper],
    landlordName:   [updateLandlordPara],
    hrEmail:        [updateHrContactPara],
    signatoryDesig: [updateSignatoryLine],
    signatoryDept:  [updateSignatoryLine]
  };

  Object.entries(plainFields).forEach(([inputSuffix, targetIds]) => {
    const inputId = 'inp' + inputSuffix.charAt(0).toUpperCase() + inputSuffix.slice(1);
    const inputEl = document.getElementById(inputId);
    if (!inputEl) return;
    inputEl.addEventListener('input', () => {
      targetIds.forEach(tid => {
        const el = document.getElementById(tid);
        if (el) el.innerText = inputEl.value;
      });
    });
  });

  Object.entries(helperTriggers).forEach(([key, fns]) => {
    const cfg     = fields[key];
    const inputEl = document.getElementById(cfg?.input || `inp${key.charAt(0).toUpperCase()}${key.slice(1)}`);
    if (!inputEl) return;
    inputEl.addEventListener('input', () => fns.forEach(fn => fn()));
  });

  const dateInput = document.getElementById('inpDate');
  if (dateInput && !dateInput.value) {
    const formatted = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    dateInput.value = formatted;
    const dv = document.getElementById('valDate');
    if (dv) dv.innerText = formatted;
  }

  const logoInput = document.getElementById('inpLogoUpload');
  const logoImg   = document.getElementById('imgCompanyLogo');
  if (logoInput && logoImg) {
    logoInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = evt => { logoImg.src = evt.target.result; logoImg.style.display = 'block'; };
      reader.readAsDataURL(file);
    });
  }

  const sigInput = document.getElementById('inpSigUpload');
  const sigImg   = document.getElementById('imgSignature');
  if (sigInput && sigImg) {
    sigInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = evt => { sigImg.src = evt.target.result; sigImg.style.display = 'block'; };
      reader.readAsDataURL(file);
    });
  }

  const btnPrint = document.getElementById('btnPrint');
  if (btnPrint) btnPrint.addEventListener('click', () => window.print());

  const btnReset = document.getElementById('btnReset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Reset all fields to sample defaults?')) location.reload();
    });
  }

  function getVal(id, fallback = '') {
    return (document.getElementById(id)?.value || fallback).trim();
  }

  function buildPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    const companyName  = getVal('inpCompanyName',  'Company Name');
    const companySub   = getVal('inpCompanySub');
    const refNo        = getVal('inpRefNo');
    const date         = getVal('inpDate');
    const empName      = getVal('inpEmpName');
    const empId        = getVal('inpEmpId');
    const designation  = getVal('inpDesignation');
    const department   = getVal('inpDepartment');
    const doj          = getVal('inpDoj');
    const permAddress  = getVal('inpPermanentAddress');
    const landlord     = getVal('inpLandlordName');
    const hrEmail      = getVal('inpHrEmail');
    const sigName      = getVal('inpSignatoryName');
    const sigDesig     = getVal('inpSignatoryDesig');
    const sigDept      = getVal('inpSignatoryDept');

    const L = 18;
    const R = 192;
    const W = R - L;
    let   y = 22;

    const BLUE  = [37,  99,  235];
    const DARK  = [15,  23,  42];
    const GRAY  = [71,  85,  105];
    const BODY  = [30,  41,  59];
    const BGBOX = [248, 250, 252];
    const FOOT  = [148, 163, 184];
    const DIVID = [226, 232, 240];

    function boldSegment(doc, label, text, x, y) {
      doc.setFont('helvetica', 'bold');
      doc.text(label, x, y);
      const lw = doc.getTextWidth(label);
      doc.setFont('helvetica', 'normal');
      doc.text(text, x + lw, y);
      return lw + doc.getTextWidth(text);
    }

    function imgFormat(src) {
      if (!src) return 'JPEG';
      if (src.startsWith('data:image/png'))  return 'PNG';
      if (src.startsWith('data:image/gif'))  return 'GIF';
      if (src.startsWith('data:image/webp')) return 'WEBP';
      if (src.startsWith('data:image/svg'))  return 'PNG';
      return 'JPEG';
    }

    function drawImg(imgEl, x, y, maxW, maxH) {
      if (!imgEl || imgEl.style.display === 'none') return 0;
      const src = imgEl.src;
      if (!src || src.length < 20) return 0;
      const nw  = imgEl.naturalWidth  || maxW;
      const nh  = imgEl.naturalHeight || maxH;
      const aspect = nw / nh;
      let w = maxW, h = maxW / aspect;
      if (h > maxH) { h = maxH; w = h * aspect; }
      try {
        doc.addImage(src, imgFormat(src), x, y, w, h);
        return h;
      } catch (e) {
        return 0;
      }
    }

    const logoImgEl = document.getElementById('imgCompanyLogo');
    const sigImgEl  = document.getElementById('imgSignature');

    const LOGO_MAX_W = 28, LOGO_MAX_H = 18;
    const logoH = (logoImgEl && logoImgEl.style.display !== 'none' && logoImgEl.src?.length > 20)
      ? drawImg(logoImgEl, R - LOGO_MAX_W, y - 4, LOGO_MAX_W, LOGO_MAX_H) : 0;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(19);
    doc.setTextColor(...DARK);
    doc.text(companyName, L, y);
    y += 8;

    const subMaxW = logoH ? W - LOGO_MAX_W - 4 : W;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    const subLines = doc.splitTextToSize(companySub, subMaxW);
    doc.text(subLines, L, y);
    y += Math.max(subLines.length * 4.8 + 4, logoH > 0 ? logoH - 4 + 6 : 0);

    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.7);
    doc.line(L, y, R, y);
    y += 9;

    doc.setFontSize(10);
    doc.setTextColor(...BODY);
    if (refNo) boldSegment(doc, 'Ref No: ', refNo, L, y);

    if (date) {
      doc.setFont('helvetica', 'bold');
      const dateLabel  = 'Date: ';
      const dateLabelW = doc.getTextWidth(dateLabel);
      doc.setFont('helvetica', 'normal');
      const dateValW   = doc.getTextWidth(date);
      const dateStartX = R - dateLabelW - dateValW;
      doc.setFont('helvetica', 'bold');
      doc.text(dateLabel, dateStartX, y);
      doc.setFont('helvetica', 'normal');
      doc.text(date, dateStartX + dateLabelW, y);
    }
    y += 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...DARK);
    const heading  = 'TO WHOM IT MAY CONCERN';
    const headingW = doc.getTextWidth(heading);
    const headingX = (210 - headingW) / 2;
    doc.text(heading, headingX, y);
    doc.setDrawColor(...DARK);
    doc.setLineWidth(0.3);
    doc.line(headingX, y + 1.2, headingX + headingW, y + 1.2);
    y += 13;

    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...BODY);
    let p1 = 'This is to certify that';
    if (empName)     p1 += ` ${empName}`;
    if (empId)       p1 += `, bearing Employee ID ${empId}`;
    p1 += ', is a full-time employee';
    if (companyName) p1 += ` of ${companyName}`;
    if (designation) p1 += ` working as ${designation}`;
    if (department)  p1 += ` in the ${department} Department`;
    if (doj)         p1 += ` since ${doj}`;
    p1 += '.';
    const p1Lines = doc.splitTextToSize(p1, W);
    doc.text(p1Lines, L, y, { align: 'justify', maxWidth: W });
    y += p1Lines.length * 6.5 + 5;

    const p2 = 'As per our official company records, the permanent address of the employee is as follows:';
    const p2Lines = doc.splitTextToSize(p2, W);
    doc.text(p2Lines, L, y);
    y += p2Lines.length * 6.5 + 4;

    const addrLines   = permAddress.split('\n').map(l => l.trim()).filter(Boolean);
    const lineH       = 6.5;
    const boxPadTop   = 5.5;
    const boxPadBot   = 5;
    const labelRowH   = 6;
    const boxH        = boxPadTop + labelRowH + addrLines.length * lineH + boxPadBot;

    doc.setFillColor(...BGBOX);
    doc.rect(L, y, W, boxH, 'F');

    doc.setFillColor(...BLUE);
    doc.rect(L, y, 1.4, boxH, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...BLUE);
    doc.text('PERMANENT ADDRESS AS PER COMPANY RECORDS', L + 4, y + boxPadTop);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...DARK);
    addrLines.forEach((line, i) => {
      doc.text(line, L + 4, y + boxPadTop + labelRowH + i * lineH);
    });
    y += boxH + 7;

    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...BODY);
    const landlordPart = landlord ? ` (${landlord})` : '';
    const p3 = `This verification letter is issued upon the request of the employee for submission to their house owner / landlord${landlordPart} for tenancy and residential verification purposes.`;
    const p3Lines = doc.splitTextToSize(p3, W);
    doc.text(p3Lines, L, y, { align: 'justify', maxWidth: W });
    y += p3Lines.length * 6.5 + 5;

    const p4 = `Should you require any further verification or details, please feel free to contact our Human Resources Department at ${hrEmail}.`;
    const p4Lines = doc.splitTextToSize(p4, W);
    doc.text(p4Lines, L, y, { align: 'justify', maxWidth: W });
    y += p4Lines.length * 6.5 + 14;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...BODY);
    if (companyName) doc.text(`For ${companyName}`, L, y);
    y += 10;

    const SIG_MAX_W = 40, SIG_MAX_H = 16;
    if (sigImgEl && sigImgEl.style.display !== 'none' && sigImgEl.src?.length > 20) {
      const sigH = drawImg(sigImgEl, L, y, SIG_MAX_W, SIG_MAX_H);
      y += sigH + 3;
    } else {
      y += 6;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...DARK);
    if (sigName) doc.text(sigName, L, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    const sigLine = sigDesig && sigDept ? `${sigDesig} (${sigDept})` : (sigDesig || sigDept || '');
    if (sigLine) doc.text(sigLine, L, y);

    doc.setDrawColor(...DIVID);
    doc.setLineWidth(0.3);
    doc.line(L, 282, R, 282);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...FOOT);
    doc.text('Official HR Document | Address Verification Proof', L, 287);
    doc.text('Page 1 of 1', R, 287, { align: 'right' });

    return doc;
  }

  const btnDownloadPdf = document.getElementById('btnDownloadPdf');
  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', () => {
      const empIdVal    = getVal('inpEmpId', 'Employee');
      const originalHTML = btnDownloadPdf.innerHTML;

      try {
        if (!window.jspdf?.jsPDF) {
          alert('PDF engine is still loading. Please try again in a moment.');
          return;
        }

        btnDownloadPdf.disabled  = true;
        btnDownloadPdf.innerHTML = `<i data-feather="loader"></i> Generating PDF...`;
        if (window.feather) feather.replace();

        const doc = buildPDF();
        doc.save(`Address_Verification_Letter_${empIdVal}.pdf`);

      } catch (err) {
        console.error('PDF error:', err);
        alert('Could not generate PDF. Please try the Print button instead.');
      } finally {
        btnDownloadPdf.disabled  = false;
        btnDownloadPdf.innerHTML = originalHTML;
        if (window.feather) feather.replace();
      }
    });
  }

});
