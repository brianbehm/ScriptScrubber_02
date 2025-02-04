import jsPDF from 'jspdf';

export function exportToPDF(analysis) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter'
  });

  // Set styling
  doc.setFont('helvetica');
  doc.setFontSize(18);
  doc.setTextColor(40);
  
  // Add title
  doc.text('Script Analysis Report', 50, 50);
  
  // Add analysis sections
  let yPos = 90;
  doc.setFontSize(12);
  
  // Characters section
  doc.setFontStyle('bold');
  doc.text('Characters:', 50, yPos);
  doc.setFontStyle('normal');
  yPos += 20;
  
  analysis.speakers.forEach((speaker, index) => {
    if (yPos > 650) { // Add new page if needed
      doc.addPage();
      yPos = 50;
    }
    doc.text(`${index + 1}. ${speaker}`, 60, yPos);
    yPos += 15;
  });

  // Metrics section
  yPos += 30;
  doc.setFontStyle('bold');
  doc.text('Key Metrics:', 50, yPos);
  doc.setFontStyle('normal');
  yPos += 20;
  
  const metrics = [
    `Total Words: ${analysis.totalWords}`,
    `Dialogue Blocks: ${analysis.totalDialogueBlocks}`,
    `Estimated Reading Time: ${analysis.readingTime} minutes`
  ];
  
  metrics.forEach(metric => {
    doc.text(`• ${metric}`, 60, yPos);
    yPos += 20;
  });

  // Save the PDF
  const filename = `ScriptAnalysis_${new Date().toISOString().slice(0,10)}.pdf`;
  doc.save(filename);
}
