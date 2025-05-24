/**
 * Portfolio Modularization Script
 * 
 * This script:
 * 1. Creates the folder structure for a modular portfolio
 * 2. Splits an existing index.html file into component files
 * 3. Creates necessary CSS and JavaScript files
 * 4. Adds a terminal component to the hero section
 * 
 * Usage: 
 * 1. Place this script in the same directory as your index.html
 * 2. Run with Node.js: node setup-portfolio.js
 * 3. The script will create all the necessary files and directories
 */

const fs = require('fs');
const path = require('path');

console.log('Portfolio Modularization Script - Starting...\n');

// Create directories if they don't exist
const directories = ['components', 'css', 'js', 'src'];
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`Created directory: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

// Check if index.html exists
let indexFileContent = '';
if (fs.existsSync('index.html')) {
  console.log('Found index.html, will process it.');
  indexFileContent = fs.readFileSync('index.html', 'utf8');
} else {
  console.log('Warning: index.html not found. Will create components without extracting existing content.');
}

// Define the patterns to extract sections from the existing index.html
const sections = [
  {
    name: 'header',
    pattern: /<header>[\s\S]*?<\/header>/,
    outputFile: 'components/header.html',
    defaultContent: `<header>
  <div class="cursor-inner" id="cursor-inner"></div>
  <div class="cursor-outer" id="cursor-outer"></div>

  <div class="navbar" id="navbar">
    <div class="hey">Hey!</div>
    <div class="logo" tabindex="0" aria-label="Shubham Khandelwal logo">
      <div class="logo-top">
        <img src="src/png/nav-avatar.png" alt="animation-head" id="nav-avatar"/>
      </div>
    </div>
    <div class="navbar-tabs" id="navbar-tabs">
      <ul class="navbar-tabs-ul">
        <li class="home activeThistab" class="navbar-tabs-li" data-aos="fade-down" data-aos-delay="100">
          <a href="#home" tabindex="0" aria-label="Home menu button">
            &#60;/Home&#62;
          </a>
        </li>

        <li class="about" class="navbar-tabs-li" data-aos="fade-down" data-aos-delay="300">
          <a href="#about" aria-label="about menu button">
            &#60;/AboutMe&#62;
          </a>
        </li>

        <li class="experience" class="navbar-tabs-li" data-aos="fade-down" data-aos-delay="400">
          <a href="#experience" aria-label="experience menu button">
            &#60;/Experience&#62;
          </a>
        </li>

        <li class="skills" class="navbar-tabs-li" data-aos="fade-down" data-aos-delay="500">
          <a href="#skills" aria-label="skills menu button">
            &#60;/Skills&#62;
          </a>
        </li>

        <li class="projects" class="navbar-tabs-li" data-aos="fade-down" data-aos-delay="700">
          <a href="#projects" aria-label="projects menu button">
            &#60;/Projects&#62;
          </a>
        </li>

        <li class="contact" class="navbar-tabs-li" data-aos="fade-down" data-aos-delay="800">
          <a href="#contact" aria-label="contact menu button">
            &#60;/Contact&#62;
          </a>
        </li>
      </ul>
    </div>
  </div>
</header>`
  },
  {
    name: 'hamburger',
    pattern: /<!-- hamburger -->[\s\S]*?<!-- mobile toggle menu ends -->/,
    outputFile: 'components/hamburger.html',
    defaultContent: `<!-- hamburger -->
<div class="hamburger" id="hamburger" data-aos="fade">
  <div class="hamburgerbase">
    <button id="hamburger-button" onclick="hamburgerMenu()" tabindex="0" aria-label="Menu Button">
      <span class="burger-bar" id="burger-bar1"></span>
      <span class="burger-bar" id="burger-bar2"></span>
      <span class="burger-bar" id="burger-bar3"></span>
    </button>
  </div>
</div>
<!-- mobile toggle menu -->
<div class="mobiletogglemenu" id="mobiletogglemenu">
  <ul class="mobile-navbar-tabs-ul" id="mobile-ul">
    <li id="home-mobile-tab" class="mobile-navbar-tabs-li home activeThismobiletab" onclick="hidemenubyli()">
      <a href="#home" tabindex="0" aria-label="Home menu button">
        &#60;/Home&#62;
      </a>
    </li>
    <li id="aboutme-mobile-tab" class="mobile-navbar-tabs-li about" onclick="hidemenubyli()">
      <a href="#about" tabindex="0" aria-label="about menu button">
        &#60;/AboutMe&#62;
      </a>
    </li>
    <li id="experience-mobile-tab" class="mobile-navbar-tabs-li experience" onclick="hidemenubyli()">
      <a href="#experience" tabindex="0" aria-label="experience menu button">
        &#60;/Experience&#62;
      </a>
    </li>
    <li id="skills-mobile-tab" class="mobile-navbar-tabs-li skills" onclick="hidemenubyli()">
      <a href="#skills" tabindex="0" aria-label="skills menu button">
        &#60;/Skills&#62;
      </a>
    </li>
    <li id="projects-mobile-tab" class="mobile-navbar-tabs-li projects" onclick="hidemenubyli()">
      <a href="#projects" tabindex="0" aria-label="projects menu button">
        &#60;/Projects&#62;
      </a>
    </li>
    <li id="contact-mobile-tab" class="mobile-navbar-tabs-li contact" onclick="hidemenubyli()">
      <a href="#contact" tabindex="0" aria-label="contact menu button">
        &#60;/Contact&#62;
      </a>
    </li>
  </ul>
</div>`
  },
  {
    name: 'hero',
    pattern: /<section class="landing-page-container"[\s\S]*?<\/section>[\s]*?<!-- landing page ends here -->/,
    outputFile: 'components/hero.html',
    defaultContent: `<section class="landing-page-container" id="home">
  <div class="blob"></div>

  <div class="text-content">
    <article id="hello-friend" data-aos="fade-up" data-aos-delay="0">
      <p class="jello">N</p>
      <p class="jello">a</p>
      <p class="jello">m</p>
      <p class="jello">a</p>
      <p class="jello">s</p>
      <p class="jello">t</p>
      <p class="jello">e</p>
      <p class="jello">(</p>
      <p class="jello">)</p>
      <p class="jello">;</p>
      &nbsp;
      <p class="jello">I</p>
      <p class="jello">'</p>
      <p class="jello">m</p>
    </article>
    <article id="name" data-aos="fade-up" data-aos-delay="200">
      <p class="jello">S</p>
      <p class="jello">H</p>
      <p class="jello">U</p>
      <p class="jello">B</p>
      <p class="jello">H</p>
      <p class="jello">A</p>
      <p class="jello">M</p>
      &nbsp;
      <p class="jello">K</p>
      <p class="jello">h</p>
      <p class="jello">a</p>
      <p class="jello">n</p>
      <p class="jello">d</p>
      <p class="jello">e</p>
      <p class="jello">l</p>
      <p class="jello">w</p>
      <p class="jello">a</p>
      <p class="jello">l</p>
      <p class="jello">.</p>
    </article>

    <article id="work" data-aos="fade-up" data-aos-delay="400">
      <div>
        <p class="jello">I</p>
      </div>
      <div>
        <p class="jello">d</p>
        <p class="jello">e</p>
        <p class="jello">s</p>
        <p class="jello">i</p>
        <p class="jello">g</p>
        <p class="jello">n</p>
      </div>
      <div>
        <p class="jello">&</p>
      </div>
      <div>
        <p class="jello">B</p>
        <p class="jello">u</p>
        <p class="jello">i</p>
        <p class="jello">l</p>
        <p class="jello">d</p>
      </div>
      <div>
        <p class="jello">w</p>
        <p class="jello">i</p>
        <p class="jello">t</p>
        <p class="jello">h</p>
      </div>
      <div>
        <p class="jello">P</p>
        <p class="jello">u</p>
        <p class="jello">r</p>
        <p class="jello">p</p>
        <p class="jello">o</p>
        <p class="jello">s</p>
        <p class="jello">e</p>
        <p class="jello">.</p>
      </div>
    </article>
    
    <!-- Terminal Component -->
    <div class="terminal-container" data-aos="fade-up" data-aos-delay="500">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="terminal-button close"></span>
          <span class="terminal-button minimize"></span>
          <span class="terminal-button maximize"></span>
        </div>
        <div class="terminal-title">shubham@portfolio: ~</div>
      </div>
      <div class="terminal-body">
        <div class="terminal-output" id="terminal-output">
          <p><span class="terminal-prompt">shubham@portfolio:~$</span> <span class="terminal-command" id="command-whoami">whoami</span></p>
          <p class="typing-effect" id="whoami-response">UI/UX Designer & Web Developer with DevOps background</p>
          
          <p><span class="terminal-prompt">shubham@portfolio:~$</span> <span class="terminal-command" id="command-skills">ls -la skills/</span></p>
          <p class="typing-effect skills-list" id="skills-response">
            -rw-r--r-- UI/UX: Figma, Canva, Logo Design<br>
            -rw-r--r-- Frontend: HTML, CSS, JavaScript, React, Next.js<br>
            -rw-r--r-- Backend: Node.js, Express, MongoDB, PostgreSQL<br>
            -rw-r--r-- DevOps: AWS, CI/CD, GitHub Actions<br>
          </p>
          
          <p><span class="terminal-prompt">shubham@portfolio:~$</span> <span class="terminal-command" id="command-contact">cat contact.txt</span></p>
          <p class="typing-effect" id="contact-response">Email: shubhamsharma2004.16@gmail.com<br>Phone: +91 8866955496<br>Location: Ahmedabad, Gujarat, India</p>
          
          <p><span class="terminal-prompt">shubham@portfolio:~$</span> <span class="terminal-cursor"></span></p>
        </div>
      </div>
    </div>

    <p id="info-para" data-aos="fade-up" data-aos-delay="600">
      Hi there! I'm Shubham Khandelwal, a UI/UX Designer and Web Developer with a background in DevOps engineering. I specialize in creating beautiful interfaces and seamless digital experiences that both delight users and solve real problems.<br />
      <br />
      My design philosophy centers on intuitive interactions and visually engaging interfaces that elevate brands and enhance user engagement. My technical background in DevOps gives me a unique perspective on creating solutions that are not only beautiful but also scalable and maintainable.
     <br>
     
      If you're looking to build a new website with stunning design or revamp your current online presence, let's chat and turn your vision into reality! </br> 
    </p>
    <div class="contact-btn-div" data-aos="fade-up" data-aos-delay="800">
      <a href="https://www.linkedin.com/in/shubhamsharmadevops%E2%98%81%EF%B8%8F/" tabindex="-1">
        <button class="letsTalkBtn">
          <p class="letsTalkBtn-text">Let's Talk!</p>
          <span class="letsTalkBtn-BG"></span>
        </button></a>
      <div class="setting-container" id="setting-container">
        <input type="checkbox" id="switchforsetting" onclick="settingtoggle()" />

        <label for="switchforsetting" class="needtobeinvert" id="labelforsetting" tabindex="0"
          aria-label="settings for sound and appearance"></label>

        <div class="visualmodetogglebuttoncontainer" id="visualmodetogglebuttoncontainer">
          <input type="checkbox" id="switchforvisualmode" onclick="visualmode()" />
          <label for="switchforvisualmode" id="labelforvisualmode" tabindex="0"
            aria-label="switch appearance"></label>
        </div>

        <div class="soundtogglebuttoncontainer" id="soundtogglebuttoncontainer">
          <input type="checkbox" id="switchforsound" onclick="playpause()" />
          <label for="switchforsound" id="labelforsound" tabindex="0" aria-label="switch sound"
            class="needtobeinvert"></label>
        </div>
      </div>
      <!-- setting div ends -->
    </div>
    <!-- contact-btn-div -->
  </div>
</section>`
  },
  {
    name: 'about',
    pattern: /<section class="about-section-container"[\s\S]*?<\/section>[\s]*?<!-- about section ends  -->/,
    outputFile: 'components/about.html',
    defaultContent: `<section class="about-section-container" id="about" data-aos="fade-up">
  <div class="about-section">
    <div class="section-heading">
      <h2 class="section-heading-article" tabindex="0" aria-label="About me heading">
        &#60;/AboutMe&#62;
      </h2>
      <p class="sectionHeadingP"></p>
    </div>

    <div class="info-dp-section">
      <div class="about-info">
        <p tabindex="0">
          A visionary UI-UX Designer and Web Developer with a passion for crafting captivating digital experiences. With an exceptional eye for design and robust front-end development expertise, I transform abstract ideas into intuitive, user-centric interfaces that leave a lasting impact. My background in DevOps engineering gives me a unique perspective on creating solutions that are not only beautiful but also scalable, secure, and maintainable.
        </p>
        <br />
        <p tabindex="0">
          "Design is not just what it looks like and feels like. Design is how it works."
        </p>
        <br />
        <p tabindex="0">
          With a proven track record of designing and developing three successful digital products, I bring a unique blend of creativity and technical expertise to the table. My experience spans creating intuitive user experiences, building responsive websites, and transforming complex ideas into elegant solutions. From in-depth user research to wireframing, prototyping, and continuous iteration, I ensure every product is crafted with precision and purpose. <br><br>
          I don't just build websites I design seamless digital experiences that connect with users, elevate brands, and drive results. Let's collaborate and bring your digital vision to life!
        </p>
        
         <!-- Resume button -->
        <button class="resume-btn" id="resume-btn" onclick="openURL()">
          <div class="sign">
            <svg viewBox="0 0 640 512">
              <path
                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
            </svg>
          </div>

          <div class="text">Resume</div>
        </button>
      </div>    

      <div class="dp" data-aos="fade-up">
        <div class="price-tag-container">
          <div class="price-tag top-left">
            <span class="price-value"></span>
            <span class="price-label">Design</span>
          </div>
          <div class="price-tag bottom-right">
            <span class="price-value"></span>
            <span class="price-label">Development</span>
          </div>
          <div class="img-container">
            <img src="src/webp/shubham(1).webp" alt="Shubham KHANDELWAL" tabindex="0" aria-label="image of shubham" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    name: 'experience',
    pattern: /<section class="experience-section-container"[\s\S]*?<\/section>[\s]*?<!-- EXPERIENCE SECTION ENDS -->/,
    outputFile: 'components/experience.html',
    defaultContent: `<section class="experience-section-container" id="experience" data-aos="fade-up">
  <div class="experience-section">
    <div class="section-heading">
      <h2 class="section-heading-article" tabindex="0" aria-label="Experience heading">
        &#60;/Experience&#62;
      </h2>
      <p class="sectionHeadingP"></p>
    </div>

    <div class="experience-timeline">
      <!-- Experience Card 1 -->
      <div class="experience-card" data-aos="fade-up">
        <div class="experience-content">
          <h3 class="job-title">DevOps Engineer</h3>
          <h4 class="company-name">AirCon Infotech</h4>
          <p class="job-duration">2023 - 2024</p>
          <ul class="job-description">
            <li>Implemented CI/CD pipelines using GitHub Actions for automated build, test, and deployment workflows</li>
            <li>Utilized AWS Lambda for creating scalable and cost-efficient serverless compute solutions</li>
            <li>Managed infrastructure with AWS CloudFormation for consistency and reliability</li>
            <li>Orchestrated GitHub and AWS Lambda integration for streamlined software delivery</li>
            <li>Optimized resource usage through serverless architecture and effective cloud management</li>
          </ul>
        </div>
      </div>
      
      <!-- Experience Card 2 -->
      <div class="experience-card" data-aos="fade-up" data-aos-delay="200">
        <div class="experience-content">
          <h3 class="job-title">UI/UX Designer & Web Developer</h3>
          <h4 class="company-name">Freelance</h4>
          <p class="job-duration">2022 - Present</p>
          <ul class="job-description">
            <li>Designed user interfaces for HIAIDO, an AI cloud management platform, improving user task completion rates</li>
            <li>Created wireframes, prototypes, and high-fidelity designs using Figma for client websites and applications</li>
            <li>Developed OSLStrategy's website with responsive design and seamless performance</li>
            <li>Crafted brand identities and logo designs for multiple businesses</li>
            <li>Conducted user research and usability testing to optimize digital experiences</li>
          </ul>
        </div>
      </div>

      <!-- Experience Card 3 -->
      <div class="experience-card" data-aos="fade-up" data-aos-delay="400">
        <div class="experience-content">
          <h3 class="job-title">Lead Full Stack Web Developer</h3>
          <h4 class="company-name">Freelance</h4>
          <p class="job-duration">2024 – Present</p>
          <ul class="job-description">
            <li>Spearhead the development of OSL Startgery's real-world products from concept through deployment</li>
            <li>Develop responsive, interactive websites using HTML5, CSS3, and modern JavaScript</li>
            <li>Architect and build high-performance frontends with React and Next.js</li>
            <li>Lead the creation of The-DevOps-Guy platform, delivering intuitive learning interfaces and mobile-first design</li>
            <li>Design and integrate data layers with MongoDB and PostgreSQL for scalable, reliable applications</li>
            <li>Partner with clients and designers to translate UI/UX prototypes into production-ready features</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    name: 'skills',
    pattern: /<section class="skills-section-container"[\s\S]*?<\/section>[\s]*?<!-- skills section ends -->/,
    outputFile: 'components/skills.html',
    defaultContent: `<section class="skills-section-container" id="skills">
  <div class="skills-section">
    <div class="section-heading" data-aos="fade-up">
      <h2 class="section-heading-article" tabindex="0" aria-label="skills heading">
        &#60;/Skills&#62;
      </h2>
      <p class="sectionHeadingP"></p>
    </div>

    <div class="frontend-dev-section">
      <h3 class="frontend-dev-heading" data-aos="fade-up" tabindex="0"
        aria-label="As a UI/UX designer and web developer, these are my skills">
Development & Design Skill          </h3>
      <ul class="tech-stack-wrapper">
      
        <!-- Web Development Skills -->
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/png/htmllogo.png" alt="Html skill" class="tech-stack-logo" />
          <span class="tooltip">HTML</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/png/csslogo.png" alt="css skill" class="tech-stack-logo" />
          <span class="tooltip">CSS</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/png/jslogo.png" alt="js skill" class="tech-stack-logo" />
          <span class="tooltip">JS</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/svg/Node.js.svg" alt="nodejs skill" class="tech-stack-logo" />
          <span class="tooltip">NodeJS</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/svg/nextjs-icon-svgrepo-com.svg" alt="nextjs skill" class="tech-stack-logo" />
          <span class="tooltip">NextJS</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/png/pngwing.com.png" alt="express skill" class="tech-stack-logo" />
          <span class="tooltip">Express JS</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/svg/MongoDB.svg" alt="mongodb skill" class="tech-stack-logo" />
          <span class="tooltip">MongoDB</span>
        </li>
      </li>
      <li class="tech-stack-box" data-aos="fade-up">
        <img src="./src/svg/PostgresSQL.svg" alt="PostgresSQL skill" class="tech-stack-logo" />
        <span class="tooltip">PostgresSQL</span>
      </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/png/reactlogo.png" alt="react skill" class="tech-stack-logo" />
          <span class="tooltip">REACT</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/svg/AngularJS.svg" alt="angular skill" class="tech-stack-logo" />
          <span class="tooltip">AngularJS</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/svg/Webflow.svg" alt="webflow skill" class="tech-stack-logo" />
          <span class="tooltip">Webflow</span>
        </li>
          <!-- UI/UX Design Skills - Moved to top -->
          <li class="tech-stack-box" data-aos="fade-up">
            <img src="./src/png/figmalogo.png" alt="figma skill" class="tech-stack-logo" />
            <span class="tooltip">FIGMA</span>
          </li>
          <li class="tech-stack-box" data-aos="fade-up">
            <img src="./src/svg/Logo Design.svg" alt="Logo Design skill" class="tech-stack-logo" />
            <span class="tooltip">Logo Design</span>
          </li>
          <li class="tech-stack-box" data-aos="fade-up">
            <img src="./src/svg/Poster Design.svg" alt="Poster Design skill" class="tech-stack-logo" />
            <span class="tooltip">Poster Design</span>
          </li>
          <li class="tech-stack-box" data-aos="fade-up">
            <img src="./src/png/canvalogo.png" alt="canva skill" class="tech-stack-logo" />
            <span class="tooltip">CANVA</span>
          </li>
          <li class="tech-stack-box" data-aos="fade-up">
            <img src="./src/svg/Photo.svg" alt="Photo editing skill" class="tech-stack-logo" />
            <span class="tooltip">Photo & Video Editing</span>
          </li>

        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/png/githublogo.png" alt="github skill" class="tech-stack-logo needtobeinvert" />
          <span class="tooltip">GITHUB</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/png/gitlogo.png" alt="git skill" class="tech-stack-logo" />
          <span class="tooltip">GIT</span>
        </li>

        <!-- DevOps Skills - Moved to bottom -->
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/svg/devops.svg" alt="DevOps" class="tech-stack-logo" />
          <span class="tooltip">DevOps</span>
        </li>
        <li class="tech-stack-box" data-aos="fade-up">
          <img src="./src/svg/aws.svg" alt="Cloud" class="tech-stack-logo" />
          <span class="tooltip">Cloud</span>
        </li>
      </ul>
    </div>
  </div>
</section>`
  },
  {
    name: 'projects',
    pattern: /<section class="projects-section-container"[\s\S]*?<\/section>/,
    outputFile: 'components/projects.html',
    defaultContent: `<section class="projects-section-container" id="projects">
  <div class="projects-section-div">
    <div class="section-heading" data-aos="fade-up">
      <h2 class="section-heading-article" tabindex="0" aria-label="My projects starts from here">
        &#60;/Projects&#62;
      </h2>
      <p class="sectionHeadingP"></p>
    </div>
    <div class="project-boxes-div">
      <!-- Project items - Add your projects here -->
      <!-- Project 1 -->
      <div class="project-box-wrapper" data-aos="fade-up">
        <div class="project-box project-box3" id="project-box3">
          <div class="info-div">
            <img src="src/svg/hiado.svg" alt="HIAIDO website favicon"
              class="faviconforProjectAquaregia" />
            <article class="ProjectHeading">HIAIDO - The Everything App
              for Cloud Management</article>
            <p class="ProjectDescription">
              Designed and developed the complete UI/UX for HIAIDO, an AI-powered cloud management platform. Created intuitive workflows for complex cloud operations, implemented responsive interfaces, and established a cohesive design system that improved user task completion rates.
            </p>
            <div class="project-buttons">
              <a href="https://www.figma.com/design/6qlkWJBGPyBwV7T53Hy8ib/HiAiDo?m=auto&t=rPNYY3h5scKB1QD6-1" target="_blank" class="github-redirect"
                aria-label="Visit HIAIDO on Figma">
                <img src="src/png/figmalogo.png" alt="Figma redirect button" />
              </a>
              <a href="https://hiaido.cloud/pricing" target="_blank" class="cta"
                aria-label="Visit HIAIDO Live">
                <span>Live view</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </a>
            </div>
          </div>
          <div class="image-div">
            <img src="src/png/Screenshot 2024-08-20 083326.png" alt="HIAIDO website preview image" />
          </div>
        </div>
      </div>
      <!-- Add more projects as needed -->
    </div>
  </div>
</section>`
  },
  {
    name: 'contact',
    pattern: /<section class="contact-section-container"[\s\S]*?<\/section>[\s]*?<!-- CONTACT SECTION ENDS -->/,
    outputFile: 'components/contact.html',
    defaultContent: `<section class="contact-section-container" id="contact" data-aos="fade-up">
  <div class="contact-section">
    <div class="section-heading">
      <h2 class="section-heading-article" tabindex="0" aria-label="Contact heading">
        &#60;/Contact&#62;
      </h2>
      <p class="sectionHeadingP"></p>
    </div>
    
    <div class="contact-content">
      <!-- Contact form -->
      <div class="contact-form-container">
        <h3 class="contact-subtitle">Send Me a Message</h3>
        <form class="contact-form" id="contactForm" action="https://formsubmit.co/shubhamsharma2004.16@gmail.com" method="POST">
          <!-- FormSubmit Configuration -->
          <input type="hidden" name="_subject" value="New Contact Form Message">
          <input type="hidden" name="_template" value="table">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_honeypot" value="phone">
          <input type="text" name="phone" style="display:none">
          <!-- Allow AJAX form submission -->
          <input type="hidden" name="_autoresponse" value="Thank you for your message! I'll get back to you shortly.">
          <input type="hidden" name="_format" value="json">
          <div class="name-display-box">
            <div id="dynamic-name">Your Name</div>
            <input type="hidden" id="name" name="name" required>
          </div>
          <div class="form-group">
            <input type="email" id="email" name="email" required placeholder="your_mail@example.com">
          </div>
          <div class="form-group">
            <input type="text" id="subject" name="subject" required placeholder="Subject">
          </div>
          <div class="form-group">
            <textarea id="message" name="message" required placeholder="Your Message"></textarea>
          </div>
          <button type="submit" class="send-message-btn">
            Send Message
          </button>
        </form>
      </div>

      <!-- Contact info -->
      <div class="contact-info-container">
        <h3 class="contact-subtitle">Get in Touch</h3>
        <div class="contact-info">
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div class="info-content">
              <h4>Call Me</h4>
              <p>+91 8866955496</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div class="info-content">
              <h4>Email</h4>
              <p>shubhamsharma2004.16@gmail.com</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="info-content">
              <h4>Location</h4>
              <p>Ahmedabad, Gujarat, India</p>
            </div>
          </div>
          <div class="contact-social">
            <a href="https://www.linkedin.com/in/shubhamsharmadevops%E2%98%81%EF%B8%8F/" target="_blank" aria-label="LinkedIn Profile">
              <svg viewBox="0 0 448 512">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
            </a>
            <a href="https://github.com/Shubham-Sharma-sk" target="_blank" aria-label="GitHub Profile">
              <svg viewBox="0 0 496 512">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    name: 'footer',
    pattern: /<footer[\s\S]*?<\/footer>[\s]*?<!-- footer ends here -->/,
    outputFile: 'components/footer.html',
    defaultContent: `<footer id="footer">
  <button class="fas" id="backtotopbutton" onclick="scrolltoTopfunction()">
    <article aria-label="Back to top">&#8592;BACK TO TOP</article>
  </button>
  <div class="footer-background">
    <div class="footer-blob"></div>
  </div>
  <div class="footer-foreground">
    <div class="footercontainer">
      <div class="two-words">
        <article tabindex="0" aria-label="Personal quote">
          "Creating beautiful experiences through design and code."
        </article>
      </div>
      <div class="social-media-container">
        <div class="getintouch-heading">
          <article>GetinTouch();</article>
        </div>
        <div class="logos">
          <a href="https://www.linkedin.com/in/shubhamsharmadevops%E2%98%81%EF%B8%8F/" target="_blank"
            aria-label="My LinkedIn"><svg class="SocialHandle" viewBox="0 0 448 512">
              <path
                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg></a>

          <a href="https://github.com/Shubham-Sharma-sk" target="_blank" aria-label="My GitHub"><svg viewBox="0 0 496 512"
              class="SocialHandle">
              <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg></a>
        </div>
      </div>
      <div class="footer-avatar-container">
        <img src="src/png/nav-avatar.png " alt="animation-head" class="footer-avatar-img" id="footer-wala-avatar"/>
        <div class="footer-avatar-face">
          <div class="footer-avatar-eye footer-left-eye">
            <div class="footer-pupil"></div>
          </div>
          <div class="footer-avatar-eye footer-right-eye">
            <div class="footer-pupil"></div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <article>
          Designed & Built by Shubham Khandelwal | UI/UX Designer & Web Developer 
        </article>
      </div>
    </div>
  </div>
</footer>`
  }
];

// Extract and save each section from the existing index.html if available
if (indexFileContent) {
  console.log('Processing existing index.html file...');
  
  sections.forEach(section => {
    let content = '';
    const match = indexFileContent.match(section.pattern);
    
    if (match) {
      content = match[0];
      console.log(`Found ${section.name} section in index.html.`);
    } else {
      content = section.defaultContent;
      console.log(`Could not find ${section.name} section in index.html. Using default content.`);
    }
    
    fs.writeFileSync(section.outputFile, content, 'utf8');
    console.log(`Created ${section.outputFile}`);
  });
  
  // Copy the original styles to the new location
  const styleMatch = indexFileContent.match(/<style>[\s\S]*?<\/style>/);
  if (styleMatch) {
    let styles = styleMatch[0];
    // Remove the style tags
    styles = styles.replace('<style>', '').replace('</style>', '');
    fs.writeFileSync('css/components.css', styles, 'utf8');
    console.log('Created css/components.css with existing styles');
  } else {
    console.log('No inline styles found in index.html. Creating basic css file.');
    // Create a basic CSS file if no styles found
    fs.writeFileSync('css/components.css', '/* Add your component styles here */', 'utf8');
  }
  
  // Check if style.css exists, if not create a basic one
  if (!fs.existsSync('css/style.css')) {
    fs.writeFileSync('css/style.css', `/* Main Styles */
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #0e0e1a;
  color: #ffffff;
}

/* Add your existing styles here or import your CSS files */
`, 'utf8');
    console.log('Created css/style.css with basic styles');
  }
} else {
  console.log('Creating component files with default content...');
  sections.forEach(section => {
    fs.writeFileSync(section.outputFile, section.defaultContent, 'utf8');
    console.log(`Created ${section.outputFile} with default content`);
  });
}

// Create the terminal.css file
fs.writeFileSync('css/terminal.css', `/* Terminal Styles */
.terminal-container {
  width: 100%;
  max-width: 700px;
  margin: 20px 0 30px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  background-color: #1e1e2e;
  font-family: 'Fira Code', monospace;
}

.terminal-header {
  background-color: #343746;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
  margin-right: 15px;
}

.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.terminal-button.close {
  background-color: #ff5f56;
}

.terminal-button.minimize {
  background-color: #ffbd2e;
}

.terminal-button.maximize {
  background-color: #27c93f;
}

.terminal-title {
  color: #f8f8f2;
  font-size: 14px;
  opacity: 0.8;
}

.terminal-body {
  padding: 15px;
  max-height: 300px;
  overflow-y: auto;
  color: #f8f8f2;
}

.terminal-output {
  line-height: 1.6;
}

.terminal-prompt {
  color: #50fa7b;
  margin-right: 10px;
}

.terminal-command {
  color: #bd93f9;
}

.terminal-cursor {
  display: inline-block;
  width: 10px;
  height: 18px;
  background-color: #f8f8f2;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.typing-effect {
  overflow: hidden;
  white-space: pre-wrap;
  margin: 0;
  display: inline-block;
  color: #8be9fd;
}

.typing-animation {
  animation: typing 2s steps(40, end);
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.skills-list {
  color: #ff79c6;
}

/* Responsive styling for terminal */
@media screen and (max-width: 768px) {
  .terminal-container {
    max-width: 100%;
  }
  
  .terminal-body {
    max-height: 250px;
  }
  
  .terminal-prompt, .terminal-command {
    font-size: 14px;
  }
}`, 'utf8');
console.log('Created css/terminal.css');

// Create the terminal.js file
fs.writeFileSync('js/terminal.js', `// Terminal functionality
function initTerminal() {
  const whoamiResponse = document.getElementById('whoami-response');
  const skillsResponse = document.getElementById('skills-response');
  const contactResponse = document.getElementById('contact-response');
  const commandWhoami = document.getElementById('command-whoami');
  const commandSkills = document.getElementById('command-skills');
  const commandContact = document.getElementById('command-contact');

  // Function to start typing animation with delay
  function startTypingWithDelay(element, delay) {
    if (!element) return;
    
    // Hide element initially
    element.style.opacity = '0';
    
    // Show and start animation after delay
    setTimeout(() => {
      element.style.opacity = '1';
      element.classList.add('typing-animation');
    }, delay);
  }

  // Function to simulate typing for commands
  function simulateCommandTyping(element, text, delay) {
    if (!element) return;
    
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          // Trigger response animation after command is typed
          const responseElement = getResponseElement(element.id);
          if (responseElement) {
            startTypingWithDelay(responseElement, 300);
          }
        }
      }, 50);
    }, delay);
  }

  // Get corresponding response element based on command ID
  function getResponseElement(commandId) {
    switch(commandId) {
      case 'command-whoami':
        return whoamiResponse;
      case 'command-skills':
        return skillsResponse;
      case 'command-contact':
        return contactResponse;
      default:
        return null;
    }
  }

  // Terminal animation sequence
  function startTerminalSequence() {
    // Start with the first command after 1 second
    simulateCommandTyping(commandWhoami, 'whoami', 1000);
    
    // Second command after first response
    simulateCommandTyping(commandSkills, 'ls -la skills/', 3500);
    
    // Third command after second response
    simulateCommandTyping(commandContact, 'cat contact.txt', 7000);
  }

  // Add click event for terminal to allow for command input if desired
  const terminal = document.querySelector('.terminal-container');
  if (terminal) {
    terminal.addEventListener('click', function() {
      // Focus or activate terminal if needed
      // This could be extended to allow actual command input
    });
  }

  // Start the terminal sequence
  startTerminalSequence();

  // Add interactive commands if desired
  document.addEventListener('keydown', function(event) {
    // This could be used to allow real input in the terminal
    // if (terminal is in focus && event.key === 'Enter') { ... }
  });
}

// Make terminal interactive with custom commands
function executeTerminalCommand(command) {
  const terminalOutput = document.getElementById('terminal-output');
  if (!terminalOutput) return;

  // Example of how to handle custom commands
  // This can be expanded based on your requirements
  if (command.toLowerCase() === 'clear') {
    // Clear terminal output except for the prompt
    const lastPrompt = terminalOutput.querySelector('p:last-child');
    terminalOutput.innerHTML = '';
    terminalOutput.appendChild(lastPrompt);
  } else if (command.toLowerCase() === 'help') {
    // Display available commands
    const helpText = document.createElement('p');
    helpText.innerHTML = \`
      Available commands:<br>
      - whoami: Display information about me<br>
      - skills: List my technical skills<br>
      - contact: Show contact information<br>
      - projects: View my featured projects<br>
      - clear: Clear the terminal screen<br>
      - help: Display this help message
    \`;
    helpText.style.color = '#8be9fd';
    terminalOutput.insertBefore(helpText, terminalOutput.querySelector('p:last-child'));
  } else {
    // Add more commands as needed
  }
}`, 'utf8');
console.log('Created js/terminal.js');

// Create the components.js file
fs.writeFileSync('js/components.js', `// Function to load HTML components
function loadComponent(elementId, componentPath) {
  const element = document.getElementById(elementId);
  if (!element) return;

  fetch(componentPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(\`Failed to load component: \${componentPath}\`);
      }
      return response.text();
    })
    .then(html => {
      element.innerHTML = html;
      // Dispatch an event to notify that the component has been loaded
      const event = new CustomEvent('componentLoaded', { detail: { id: elementId } });
      document.dispatchEvent(event);
    })
    .catch(error => {
      console.error(\`Error loading component \${componentPath}:\`, error);
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load all components
  loadComponent('header-component', 'components/header.html');
  loadComponent('hamburger-component', 'components/hamburger.html');
  loadComponent('hero-component', 'components/hero.html');
  loadComponent('about-component', 'components/about.html');
  loadComponent('experience-component', 'components/experience.html');
  loadComponent('skills-component', 'components/skills.html');
  loadComponent('projects-component', 'components/projects.html');
  loadComponent('contact-component', 'components/contact.html');
  loadComponent('footer-component', 'components/footer.html');
});

// Listen for component load events to initialize component-specific scripts
document.addEventListener('componentLoaded', function(e) {
  const componentId = e.detail.id;
  
  // Initialize component-specific functionality
  switch(componentId) {
    case 'hero-component':
      // Initialize terminal after hero component is loaded
      if (typeof initTerminal === 'function') {
        initTerminal();
      }
      break;
    case 'header-component':
      // Initialize cursor effects and navigation
      initCursorEffects();
      break;
    // Add other component initializations as needed
  }
});`, 'utf8');
console.log('Created js/components.js');

// Initialize cursor effects
function initCursorEffects() {
  const cursorInner = document.getElementById("cursor-inner");
  const cursorOuter = document.getElementById("cursor-outer");
  const links = document.querySelectorAll("a,label,button");

  if (!cursorInner || !cursorOuter) return;

  // Add event listeners to links (only once, not on every mouse move)
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursorInner.classList.add("hover");
      cursorOuter.classList.add("hover");
    });
    link.addEventListener("mouseleave", () => {
      cursorInner.classList.remove("hover");
      cursorOuter.classList.remove("hover");
    });
  });

  document.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorInner.style.left = `${posX}px`;
    cursorInner.style.top = `${posY}px`;

    cursorOuter.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  });
}