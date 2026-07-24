document.addEventListener('DOMContentLoaded', () => {

  let currentDocType = 'verification';

  function iv(id) {
    return (document.getElementById(id)?.value || '').trim();
  }

  const docTypeTabs = document.querySelectorAll('#docTypeTabs [data-doc-type]');
  docTypeTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      docTypeTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDocType = btn.getAttribute('data-doc-type');
      updateDocFieldsVisibility();
      renderPreview();
    });
  });

  function updateDocFieldsVisibility() {
    document.getElementById('fieldsVerification')?.classList.toggle('d-none', currentDocType !== 'verification');
    document.getElementById('fieldsNoc')?.classList.toggle('d-none', currentDocType !== 'noc');
    document.getElementById('fieldsRelieving')?.classList.toggle('d-none', currentDocType !== 'relieving');
    document.getElementById('fieldsInternship')?.classList.toggle('d-none', currentDocType !== 'internship');
  }

  function renderPreview() {
    const empName     = iv('inpEmpName');
    const empId       = iv('inpEmpId');
    const companyName = iv('inpCompanyName');
    const companySub  = iv('inpCompanySub');
    const desig       = iv('inpDesignation');
    const dept        = iv('inpDepartment');
    const refNo       = iv('inpRefNo');
    const date        = iv('inpDate');
    const sigName     = iv('inpSignatoryName');
    const sigDesig    = iv('inpSignatoryDesig');
    const sigDept     = iv('inpSignatoryDept');

    const valCompany = document.getElementById('valCompanyName');
    if (valCompany) valCompany.innerText = companyName || 'Company Name';
    
    const valSub = document.getElementById('valCompanySub');
    if (valSub) valSub.innerText = companySub;

    const refWrapper = document.getElementById('refNoWrapper');
    if (refWrapper) {
      refWrapper.innerHTML = refNo ? `<strong>Ref No:</strong> <span id="valRefNo">${refNo}</span>` : '';
    }

    const dateWrapper = document.getElementById('dateWrapper');
    if (dateWrapper) {
      dateWrapper.innerHTML = date ? `<strong>Date:</strong> <span id="valDate">${date}</span>` : '';
    }

    const signTitle = document.getElementById('signOffTitle');
    if (signTitle) {
      signTitle.innerText = companyName ? `For ${companyName}` : '';
    }

    const valSigName = document.getElementById('valSignatoryName');
    if (valSigName) valSigName.innerText = sigName;

    const valSigLine = document.getElementById('valSignatoryLine');
    if (valSigLine) {
      if (sigDesig && sigDept) valSigLine.innerText = `${sigDesig} (${sigDept})`;
      else valSigLine.innerText = sigDesig || sigDept;
    }

    const subjEl = document.getElementById('valDocSubject');
    const bodyEl = document.getElementById('valDocBody');
    if (!subjEl || !bodyEl) return;

    if (currentDocType === 'verification') {
      subjEl.innerText = 'TO WHOM IT MAY CONCERN';
      const address = iv('inpPermanentAddress');
      const landlord = iv('inpLandlordName');
      const hrInfo = iv('inpHrEmail');
      const doj = iv('inpDoj');

      let p1 = 'This is to certify that';
      if (empName) p1 += ` <strong>${empName}</strong>`;
      if (empId) p1 += `, bearing Employee ID <strong>${empId}</strong>`;
      p1 += ', is a full-time employee';
      if (companyName) p1 += ` of <strong>${companyName}</strong>`;
      if (desig) p1 += ` working as <strong>${desig}</strong>`;
      if (dept) p1 += ` in the <strong>${dept}</strong> Department`;
      if (doj) p1 += ` since <strong>${doj}</strong>`;
      p1 += '.';

      const landlordPart = landlord ? ` (<strong>${landlord}</strong>)` : '';
      const p3 = `This verification letter is issued upon the request of the employee for submission to their house owner / landlord${landlordPart} for tenancy and residential verification purposes.`;

      const hrPart = hrInfo ? ` at <span>${hrInfo}</span>` : '';
      const p4 = `Should you require any further verification or information, please feel free to contact our Human Resources Department${hrPart}.`;

      bodyEl.innerHTML = `
        <p>${p1}</p>
        <p>As per our official company records, the permanent address of the employee is as follows:</p>
        <div class="address-box">
          <div class="address-box-header">PERMANENT ADDRESS AS PER COMPANY RECORDS</div>
          <div class="address-box-content">${address}</div>
        </div>
        <p>${p3}</p>
        <p>${p4}</p>
      `;

    } else if (currentDocType === 'noc') {
      subjEl.innerText = 'NO-OBJECTION CERTIFICATE (NOC)';
      const purpose = iv('inpNocPurpose');
      const idNum = iv('inpIdNumber');
      const targetEntity = iv('inpTargetEntity');

      let p1 = 'This is to certify that';
      if (empName) p1 += ` <strong>${empName}</strong>`;
      if (empId) p1 += ` (Employee ID: <strong>${empId}</strong>)`;
      p1 += ', is a bona fide employee';
      if (companyName) p1 += ` of <strong>${companyName}</strong>`;
      if (desig) p1 += ` working as <strong>${desig}</strong>`;
      if (dept) p1 += ` in the <strong>${dept}</strong> Department`;
      p1 += '.';

      let p2 = `Management has <strong>No Objection</strong> to the employee pursuing/applying for <strong>${purpose}</strong>`;
      if (idNum) p2 += ` (ID/Passport No: <strong>${idNum}</strong>)`;
      if (targetEntity) p2 += ` with <strong>${targetEntity}</strong>`;
      p2 += '.';

      const p3 = 'The company confirms that the employee maintains good standing and this NOC is granted strictly for official documentation purposes.';

      bodyEl.innerHTML = `
        <p>${p1}</p>
        <p>${p2}</p>
        <p>${p3}</p>
      `;

    } else if (currentDocType === 'relieving') {
      subjEl.innerText = 'RELIEVING & EXPERIENCE LETTER';
      const doj = iv('inpDojRelieving');
      const dol = iv('inpDol');
      const conduct = iv('inpConductNote');

      let p1 = 'This letter confirms that';
      if (empName) p1 += ` <strong>${empName}</strong>`;
      if (empId) p1 += ` (Employee ID: <strong>${empId}</strong>)`;
      p1 += ' was employed with';
      if (companyName) p1 += ` <strong>${companyName}</strong>`;
      if (doj && dol) p1 += ` from <strong>${doj}</strong> to <strong>${dol}</strong>`;
      if (desig) p1 += `, holding the final designation of <strong>${desig}</strong>`;
      if (dept) p1 += ` in the <strong>${dept}</strong> Department`;
      p1 += '.';

      let p2 = 'During their tenure with us, their professional performance and conduct were found to be';
      if (conduct) p2 += ` <strong>${conduct}</strong>`;
      else p2 += ' satisfactory';
      p2 += '. The employee has been officially relieved of all company duties and responsibilities.';

      const p3 = 'We wish them all the best in their future endeavors.';

      bodyEl.innerHTML = `
        <p>${p1}</p>
        <p>${p2}</p>
        <p>${p3}</p>
      `;

    } else if (currentDocType === 'internship') {
      subjEl.innerText = 'INTERNSHIP COMPLETION CERTIFICATE';
      const start = iv('inpInternStart');
      const end = iv('inpInternEnd');
      const domain = iv('inpProjectDomain');
      const mentor = iv('inpMentorName');

      let p1 = 'This certificate is proudly awarded to';
      if (empName) p1 += ` <strong>${empName}</strong>`;
      if (empId) p1 += ` (Roll/ID: <strong>${empId}</strong>)`;
      p1 += ' for successfully completing their internship program';
      if (companyName) p1 += ` at <strong>${companyName}</strong>`;
      if (start && end) p1 += ` from <strong>${start}</strong> to <strong>${end}</strong>`;
      p1 += '.';

      let p2 = 'During this period, they actively contributed to key deliverables in';
      if (domain) p2 += ` <strong>${domain}</strong>`;
      else p2 += ' their assigned domain';
      if (mentor) p2 += ` under the guidance of <strong>${mentor}</strong>`;
      p2 += '.';

      const p3 = 'They demonstrated commendable dedication, technical curiosity, and teamwork. We wish them continuous success in their career journey.';

      bodyEl.innerHTML = `
        <p>${p1}</p>
        <p>${p2}</p>
        <p>${p3}</p>
      `;
    }
  }

  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', renderPreview);
    input.addEventListener('change', renderPreview);
  });

  const dateInput = document.getElementById('inpDate');
  if (dateInput && !dateInput.value) {
    const formatted = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    dateInput.value = formatted;
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

  function hexToRgb(hex) {
    hex = (hex || '#0d6efd').replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  function applyPrimaryColor(hex) {
    document.documentElement.style.setProperty('--brand-accent', hex);
    const hexBadge = document.getElementById('valColorHex');
    if (hexBadge) hexBadge.innerText = hex;
    const colorInput = document.getElementById('inpPrimaryColor');
    if (colorInput && colorInput.value !== hex) colorInput.value = hex;
  }

  const primaryColorInput = document.getElementById('inpPrimaryColor');
  if (primaryColorInput) {
    primaryColorInput.addEventListener('input', e => applyPrimaryColor(e.target.value));
  }

  const swatches = document.querySelectorAll('.color-swatch');
  swatches.forEach(btn => {
    btn.addEventListener('click', () => {
      const hex = btn.getAttribute('data-color');
      if (hex) applyPrimaryColor(hex);
    });
  });

  function imgFormat(src) {
    if (!src) return 'JPEG';
    if (src.startsWith('data:image/png'))  return 'PNG';
    if (src.startsWith('data:image/gif'))  return 'GIF';
    if (src.startsWith('data:image/webp')) return 'WEBP';
    if (src.startsWith('data:image/svg'))  return 'PNG';
    return 'JPEG';
  }

  function drawImg(doc, imgEl, x, y, maxW, maxH) {
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

  function buildPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    const companyName  = iv('inpCompanyName') || 'Company Name';
    const companySub   = iv('inpCompanySub');
    const refNo        = iv('inpRefNo');
    const date         = iv('inpDate');
    const empName      = iv('inpEmpName');
    const empId        = iv('inpEmpId');
    const designation  = iv('inpDesignation');
    const department   = iv('inpDepartment');
    const sigName      = iv('inpSignatoryName');
    const sigDesig     = iv('inpSignatoryDesig');
    const sigDept      = iv('inpSignatoryDept');

    const L = 18;
    const R = 192;
    const W = R - L;
    let   y = 22;

    const brandHex = iv('inpPrimaryColor') || '#0d6efd';
    const BLUE  = hexToRgb(brandHex);
    const DARK  = [15,  23,  42];
    const GRAY  = [71,  85,  105];
    const BODY  = [30,  41,  59];
    const BGBOX = [248, 250, 252];
    const FOOT  = [148, 163, 184];
    const DIVID = [226, 232, 240];

    const logoImgEl = document.getElementById('imgCompanyLogo');
    const sigImgEl  = document.getElementById('imgSignature');

    const LOGO_MAX_W = 28, LOGO_MAX_H = 18;
    const logoH = (logoImgEl && logoImgEl.style.display !== 'none' && logoImgEl.src?.length > 20)
      ? drawImg(doc, logoImgEl, R - LOGO_MAX_W, y - 4, LOGO_MAX_W, LOGO_MAX_H) : 0;

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
    if (refNo) {
      doc.setFont('helvetica', 'bold');
      doc.text('Ref No: ', L, y);
      doc.setFont('helvetica', 'normal');
      doc.text(refNo, L + doc.getTextWidth('Ref No: '), y);
    }

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

    let heading = 'TO WHOM IT MAY CONCERN';
    if (currentDocType === 'noc') heading = 'NO-OBJECTION CERTIFICATE (NOC)';
    if (currentDocType === 'relieving') heading = 'RELIEVING & EXPERIENCE LETTER';
    if (currentDocType === 'internship') heading = 'INTERNSHIP COMPLETION CERTIFICATE';

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...DARK);
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

    if (currentDocType === 'verification') {
      const address = iv('inpPermanentAddress');
      const landlord = iv('inpLandlordName');
      const hrInfo = iv('inpHrEmail');
      const doj = iv('inpDoj');

      let p1 = 'This is to certify that';
      if (empName) p1 += ` ${empName}`;
      if (empId) p1 += `, bearing Employee ID ${empId}`;
      p1 += ', is a full-time employee';
      if (companyName) p1 += ` of ${companyName}`;
      if (designation) p1 += ` working as ${designation}`;
      if (department) p1 += ` in the ${department} Department`;
      if (doj) p1 += ` since ${doj}`;
      p1 += '.';

      const p1Lines = doc.splitTextToSize(p1, W);
      doc.text(p1Lines, L, y, { align: 'justify', maxWidth: W });
      y += p1Lines.length * 6.5 + 4;

      const p2 = 'As per our official company records, the permanent address of the employee is as follows:';
      const p2Lines = doc.splitTextToSize(p2, W);
      doc.text(p2Lines, L, y);
      y += p2Lines.length * 6.5 + 4;

      const addrLines   = address.split('\n').map(l => l.trim()).filter(Boolean);
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

      const hrPart = hrInfo ? ` at ${hrInfo}` : '';
      const p4 = `Should you require any further verification or details, please feel free to contact our Human Resources Department${hrPart}.`;
      const p4Lines = doc.splitTextToSize(p4, W);
      doc.text(p4Lines, L, y, { align: 'justify', maxWidth: W });
      y += p4Lines.length * 6.5 + 14;

    } else if (currentDocType === 'noc') {
      const purpose = iv('inpNocPurpose');
      const idNum = iv('inpIdNumber');
      const targetEntity = iv('inpTargetEntity');

      let p1 = 'This is to certify that';
      if (empName) p1 += ` ${empName}`;
      if (empId) p1 += ` (Employee ID: ${empId})`;
      p1 += ', is a bona fide employee';
      if (companyName) p1 += ` of ${companyName}`;
      if (designation) p1 += ` working as ${designation}`;
      if (department) p1 += ` in the ${department} Department`;
      p1 += '.';
      const p1Lines = doc.splitTextToSize(p1, W);
      doc.text(p1Lines, L, y, { align: 'justify', maxWidth: W });
      y += p1Lines.length * 6.5 + 6;

      let p2 = `Management has No Objection to the employee pursuing/applying for ${purpose}`;
      if (idNum) p2 += ` (ID/Passport No: ${idNum})`;
      if (targetEntity) p2 += ` with ${targetEntity}`;
      p2 += '.';
      const p2Lines = doc.splitTextToSize(p2, W);
      doc.text(p2Lines, L, y, { align: 'justify', maxWidth: W });
      y += p2Lines.length * 6.5 + 6;

      const p3 = 'The company confirms that the employee maintains good standing and this NOC is granted strictly for official documentation purposes.';
      const p3Lines = doc.splitTextToSize(p3, W);
      doc.text(p3Lines, L, y, { align: 'justify', maxWidth: W });
      y += p3Lines.length * 6.5 + 14;

    } else if (currentDocType === 'relieving') {
      const doj = iv('inpDojRelieving');
      const dol = iv('inpDol');
      const conduct = iv('inpConductNote');

      let p1 = 'This letter confirms that';
      if (empName) p1 += ` ${empName}`;
      if (empId) p1 += ` (Employee ID: ${empId})`;
      p1 += ' was employed with';
      if (companyName) p1 += ` ${companyName}`;
      if (doj && dol) p1 += ` from ${doj} to ${dol}`;
      if (designation) p1 += `, holding the final designation of ${designation}`;
      if (department) p1 += ` in the ${department} Department`;
      p1 += '.';
      const p1Lines = doc.splitTextToSize(p1, W);
      doc.text(p1Lines, L, y, { align: 'justify', maxWidth: W });
      y += p1Lines.length * 6.5 + 6;

      let p2 = 'During their tenure with us, their professional performance and conduct were found to be';
      if (conduct) p2 += ` ${conduct}`;
      else p2 += ' satisfactory';
      p2 += '. The employee has been officially relieved of all company duties and responsibilities.';
      const p2Lines = doc.splitTextToSize(p2, W);
      doc.text(p2Lines, L, y, { align: 'justify', maxWidth: W });
      y += p2Lines.length * 6.5 + 6;

      const p3 = 'We wish them all the best in their future endeavors.';
      const p3Lines = doc.splitTextToSize(p3, W);
      doc.text(p3Lines, L, y, { align: 'justify', maxWidth: W });
      y += p3Lines.length * 6.5 + 14;

    } else if (currentDocType === 'internship') {
      const start = iv('inpInternStart');
      const end = iv('inpInternEnd');
      const domain = iv('inpProjectDomain');
      const mentor = iv('inpMentorName');

      let p1 = 'This certificate is proudly awarded to';
      if (empName) p1 += ` ${empName}`;
      if (empId) p1 += ` (Roll/ID: ${empId})`;
      p1 += ' for successfully completing their internship program';
      if (companyName) p1 += ` at ${companyName}`;
      if (start && end) p1 += ` from ${start} to ${end}`;
      p1 += '.';
      const p1Lines = doc.splitTextToSize(p1, W);
      doc.text(p1Lines, L, y, { align: 'justify', maxWidth: W });
      y += p1Lines.length * 6.5 + 6;

      let p2 = 'During this period, they actively contributed to key deliverables in';
      if (domain) p2 += ` ${domain}`;
      else p2 += ' their assigned domain';
      if (mentor) p2 += ` under the guidance of ${mentor}`;
      p2 += '.';
      const p2Lines = doc.splitTextToSize(p2, W);
      doc.text(p2Lines, L, y, { align: 'justify', maxWidth: W });
      y += p2Lines.length * 6.5 + 6;

      const p3 = 'They demonstrated commendable dedication, technical curiosity, and teamwork. We wish them continuous success in their career journey.';
      const p3Lines = doc.splitTextToSize(p3, W);
      doc.text(p3Lines, L, y, { align: 'justify', maxWidth: W });
      y += p3Lines.length * 6.5 + 14;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...BODY);
    if (companyName) doc.text(`For ${companyName}`, L, y);
    y += 10;

    const SIG_MAX_W = 40, SIG_MAX_H = 16;
    if (sigImgEl && sigImgEl.style.display !== 'none' && sigImgEl.src?.length > 20) {
      const sigH = drawImg(doc, sigImgEl, L, y, SIG_MAX_W, SIG_MAX_H);
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
    doc.text('Official HR Document | Verification & Certification Suite', L, 287);
    doc.text('Page 1 of 1', R, 287, { align: 'right' });

    return doc;
  }

  const btnDownloadPdf = document.getElementById('btnDownloadPdf');
  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', () => {
      const empIdVal = iv('inpEmpId') || 'Document';
      const originalHTML = btnDownloadPdf.innerHTML;

      try {
        if (!window.jspdf?.jsPDF) {
          alert('PDF engine is loading. Please try again.');
          return;
        }

        btnDownloadPdf.disabled  = true;
        btnDownloadPdf.innerHTML = `<i data-feather="loader" class="icon-sm"></i> Generating...`;
        if (window.feather) feather.replace();

        const doc = buildPDF();
        doc.save(`${currentDocType.toUpperCase()}_Letter_${empIdVal}.pdf`);

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

  renderPreview();

});
