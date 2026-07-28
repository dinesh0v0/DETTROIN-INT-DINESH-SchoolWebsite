import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const resources = [
  {
    name: 'academic-calendar-2024-25',
    title: 'ACADEMIC CALENDAR 2024-25',
    content: `
      <h2>August 2024 - Term 1 Begins</h2>
      <p>Aug 15: Independence Day (Holiday)<br>Aug 26: First Day of Classes</p>
      <h2>September 2024</h2>
      <p>Sep 5: Teachers' Day Celebration<br>Sep 25: Annual Sports Day</p>
      <h2>October 2024</h2>
      <p>Oct 2: Gandhi Jayanti (Holiday)<br>Oct 14-18: Mid-Term Examinations</p>
      <h2>November 2024</h2>
      <p>Nov 1: Diwali Break Begins<br>Nov 10: Classes Resume</p>
    `
  },
  {
    name: 'parent-handbook',
    title: 'PARENT HANDBOOK',
    content: `
      <h2>Welcome to KIS</h2>
      <p>This handbook is designed to provide you with essential information about our school's policies, procedures, and expectations.</p>
      <h2>Communication</h2>
      <p>We believe in strong parent-teacher partnerships. Regular updates will be provided via the portal.</p>
      <h2>Attendance Policy</h2>
      <p>Students are expected to maintain at least 90% attendance. Absences must be reported to the homeroom teacher by 8:30 AM.</p>
      <h2>Dress Code</h2>
      <p>The school uniform must be worn at all times. Physical Education uniforms are required on sports days.</p>
    `
  },
  {
    name: 'student-code-of-conduct',
    title: 'STUDENT CODE OF CONDUCT',
    content: `
      <h2>Core Values</h2>
      <p>Respect, Integrity, Responsibility, and Excellence.</p>
      <h2>Behavioral Expectations</h2>
      <p>Students are expected to treat all members of the school community with respect and dignity.</p>
      <h2>Academic Integrity</h2>
      <p>Cheating, plagiarism, and all forms of academic dishonesty are strictly prohibited and will result in disciplinary action.</p>
      <h2>Technology Use</h2>
      <p>Devices must only be used for educational purposes during school hours. Cyberbullying is a serious offense.</p>
    `
  },
  {
    name: 'fee-structure',
    title: 'FEE STRUCTURE (2024-25)',
    content: `
      <h2>Admission Fees (One-time)</h2>
      <p>Pre-Primary: ₹25,000<br>Primary (I-V): ₹30,000<br>Middle (VI-VIII): ₹35,000<br>Senior (IX-XII): ₹40,000</p>
      <h2>Tuition Fees (Annual)</h2>
      <p>Pre-Primary: ₹80,000<br>Primary (I-V): ₹95,000<br>Middle (VI-VIII): ₹1,10,000<br>Senior (IX-XII): ₹1,30,000</p>
      <h2>Other Charges (Annual)</h2>
      <p>Pre-Primary: ₹15,000<br>Primary (I-V): ₹18,000<br>Middle (VI-VIII): ₹20,000<br>Senior (IX-XII): ₹22,000</p>
      <h2>Payment Schedule</h2>
      <p>Fees are payable in three equal installments at the beginning of each term.</p>
    `
  }
];

const generateHtml = (resource) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #F3EFE7;
      color: #1A1A1A;
      margin: 0;
      padding: 40px;
    }
    
    .container {
      border: 4px solid #1A1A1A;
      padding: 40px;
      box-shadow: 12px 12px 0px 0px #1A1A1A;
      background-color: #F3EFE7;
      min-height: 800px;
    }
    
    .header {
      border-bottom: 4px solid #1A1A1A;
      padding-bottom: 20px;
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    
    h1 {
      font-family: 'Archivo Black', sans-serif;
      font-size: 36px;
      margin: 0;
      text-transform: uppercase;
      color: #C4411C;
    }
    
    .logo {
      font-family: 'Archivo Black', sans-serif;
      font-size: 20px;
      line-height: 1;
    }
    
    h2 {
      font-family: 'Archivo Black', sans-serif;
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 2px solid #1A1A1A;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${resource.title}</h1>
      <div class="logo">KRISHNA<br>INTERNATIONAL<br>SCHOOL</div>
    </div>
    
    <div class="content">
      ${resource.content}
    </div>
    
    <div class="footer">
      <span>Official Document</span>
      <span>2024-25 Academic Year</span>
    </div>
  </div>
</body>
</html>
`;

async function main() {
  const resourcesDir = path.join(process.cwd(), 'public', 'resources');
  try {
    await fs.mkdir(resourcesDir, { recursive: true });
  } catch (e) {
    // Directory might exist, ignore
  }

  console.log('Starting PDF generation...');
  const browser = await puppeteer.launch({ headless: 'new' });
  
  for (const resource of resources) {
    console.log(`Generating ${resource.name}.pdf...`);
    const page = await browser.newPage();
    const html = generateHtml(resource);
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Add a slight delay to ensure fonts are loaded
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await page.pdf({
      path: path.join(resourcesDir, `${resource.name}.pdf`),
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });
    
    await page.close();
  }
  
  await browser.close();
  console.log('All PDFs generated successfully!');
}

main().catch(console.error);
