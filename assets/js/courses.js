/* --------------------------------------------------
   Courses I Have Studied: click a course to see the topics covered
   (courses.js, works with courses.css)
   - No change is needed in the course rows of index.html.
   - To edit the topics of a course, change its list in TOPICS below.
-------------------------------------------------- */
(function () {
  'use strict';

  var TOPICS = {
    /* Semester 1 */
    'CYL1020': ['Atomic structure and quantum basics', 'Chemical bonding and molecular orbitals', 'Periodic properties', 'Thermodynamics and equilibrium', 'Introduction to spectroscopy'],
    'LAL1010': ['Hindi prose and poetry', 'Grammar and writing skills', 'Overview of Hindi literature', 'Communication in Hindi'],
    'OSN1010': ['Community engagement and service', 'Understanding social issues', 'Field visits and activities', 'Reflective reporting'],
    'LAL1020': ['Basics of theatre and performance', 'Voice and body work', 'Script reading and improvisation', 'Staging a short performance'],
    'EDL1010': ['Ancient and medieval Indian education', 'Colonial education system', 'Post-independence education commissions', 'National Education Policy'],
    'MAL1030': ['Limits and continuity', 'Differentiation and its applications', 'Integration', 'Sequences and series'],
    'MSL1010': ['Indian knowledge traditions', 'Philosophy and thought', 'Science and mathematics heritage', 'Art and culture'],
    'PHL1020': ['Newtonian mechanics', 'Work, energy and conservation laws', 'Rotational dynamics', 'Oscillations and waves'],
    'DSN1010': ['Empathy and user research', 'Problem definition', 'Ideation and sketching', 'Prototyping basics'],

    /* Semester 2 */
    'EDL1020': ['Role of the teacher in society', 'Education and social change', 'Diversity, equity and inclusion', 'Teacher ethics and professionalism'],
    'PHL1030': ['Electrostatics and magnetostatics', 'Introduction to Maxwell’s equations', 'Electromagnetic waves', 'Basic optics'],
    'CYL1030': ['Organic chemistry basics', 'Reaction mechanisms', 'Stereochemistry', 'Coordination chemistry', 'Chemical kinetics'],
    'OSN1040': ['Community-based project work', 'Data collection and surveys', 'Reflection and reporting'],
    'DSL1020': ['Hands-on prototyping', 'User testing and feedback', 'Team design project', 'Presenting solutions'],
    'LAL1040': ['Reading comprehension', 'Academic and technical writing', 'Grammar and vocabulary', 'Presentation skills'],
    'MAL1050': ['Data handling and visualisation', 'Descriptive statistics', 'Probability basics', 'Programming with Python'],
    'BBL1200': ['Cell structure and function', 'Biomolecules', 'Genetics', 'Evolution and ecosystems'],
    'MSL1020': ['Ancient Indian science and technology', 'Yoga and well-being', 'Indian art and architecture', 'Values and ethics'],
    'MAL1040': ['Partial derivatives', 'Multiple integrals', 'Vector calculus', 'Applications in science'],

    /* Semester 3 */
    'PHL2020': ['Laws of thermodynamics', 'Entropy', 'Thermodynamic potentials', 'Kinetic theory of gases', 'Phase transitions'],
    'EDL2010': ['Theories of learning', 'Lesson planning', 'Classroom management', 'Assessment basics'],
    'MAL2120': ['Vector spaces', 'Linear transformations', 'Matrices and determinants', 'Eigenvalues and eigenvectors', 'Inner product spaces'],
    'PHL2030': ['Nature of light', 'Interference', 'Diffraction', 'Polarisation'],
    'LAL2180': ['Stages of child development', 'Piaget and Vygotsky', 'Motivation and learning', 'Individual differences'],
    'EDN2010': ['Decomposition and pattern recognition', 'Algorithms', 'Programming basics', 'Problem solving', 'Course project: Pokémon Study Timer Game'],

    /* Semester 4 */
    'PHD2010': ['Project planning and literature review', 'Design or modelling', 'Data analysis', 'Report writing and presentation'],
    'EDL2020': ['Physics curriculum analysis', 'Teaching strategies for physics', 'Demonstrations and activities', 'Lesson plans and assessment'],
    'PHL2210': ['Vector calculus', 'Curvilinear coordinates', 'Fourier series', 'Special functions'],
    'PHL2200': ['Electrostatics and Gauss’s law', 'Boundary value problems', 'Dielectrics', 'Magnetostatics'],
    'EDL2030': ['Nature of mathematics', 'Teaching strategies', 'Common misconceptions', 'Lesson plans and assessment'],
    'LAL2210': ['Philosophies of education', 'Sociological perspectives', 'Curriculum and society', 'Education and equity'],
    'MAL2140': ['First-order ODEs', 'Second-order linear ODEs', 'Laplace transforms', 'Series solutions'],

    /* Semester 5 */
    'EDL3040': ['Digital tools for teaching', 'Educational technologies', 'Designing digital lessons', 'Online assessment'],
    'PHL3120': ['Lasers', 'Fourier optics', 'Coherence', 'Fibre optics'],
    'PHL3110': ['Semiconductors and diodes', 'Transistors (BJT, FET)', 'Amplifiers', 'Operational amplifiers'],
    'EDL3020': ['Inquiry-based teaching', 'Laboratory pedagogy', 'Micro-teaching', 'Assessment in physical sciences'],
    'PHP3070': ['Optics and electronics experiments', 'Error analysis', 'Data analysis', 'Lab reports'],
    'PHL3030': ['Crystal structure', 'X-ray diffraction', 'Lattice vibrations', 'Free electron theory', 'Band theory'],
    'EDL3030': ['School observation', 'Lesson planning', 'Micro-teaching practice', 'Reflective journals'],
    'EDL3010': ['Advanced teaching methods', 'Problem solving in mathematics', 'Assessment and feedback', 'Lesson plans and micro-teaching']
  };

  var rows = document.querySelectorAll('#courses .cr-row');
  if (!rows.length) return;

  /* Build the popup once */
  var modal = document.createElement('div');
  modal.className = 'cr-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
    '<div class="cr-modal-box" role="dialog" aria-modal="true" aria-labelledby="crModalTitle">' +
      '<button type="button" class="cr-modal-close" aria-label="Close">&times;</button>' +
      '<div class="cr-modal-code"></div>' +
      '<h3 class="cr-modal-title" id="crModalTitle"></h3>' +
      '<div class="cr-modal-tags"></div>' +
      '<div class="cr-modal-label">Topics covered</div>' +
      '<ul class="cr-modal-list"></ul>' +
    '</div>';
  document.body.appendChild(modal);

  var elCode = modal.querySelector('.cr-modal-code');
  var elTitle = modal.querySelector('.cr-modal-title');
  var elTags = modal.querySelector('.cr-modal-tags');
  var elList = modal.querySelector('.cr-modal-list');
  var elClose = modal.querySelector('.cr-modal-close');
  var lastRow = null;

  function openModal(row) {
    var spans = row.querySelectorAll('span');
    var text = spans[0] ? spans[0].textContent.trim() : '';
    var category = spans[1] ? spans[1].textContent.trim() : '';
    var parts = text.split(/\s*·\s*/);
    var code = parts[0];
    var name = parts.slice(1).join(' · ') || text;

    var semBox = row.closest('.cr-sem');
    var semHead = semBox ? semBox.querySelector('h4') : null;
    var semester = semHead ? semHead.textContent.replace(/\s+/g, ' ').trim() : '';

    elCode.textContent = code;
    elTitle.textContent = name;

    elTags.innerHTML = '';
    [semester, category].forEach(function (t) {
      if (!t) return;
      var s = document.createElement('span');
      s.textContent = t;
      elTags.appendChild(s);
    });

    elList.innerHTML = '';
    (TOPICS[code] || ['Topics will be added soon.']).forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      elList.appendChild(li);
    });

    lastRow = row;
    modal.classList.add('cr-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    elClose.focus();
  }

  function closeModal() {
    modal.classList.remove('cr-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastRow) lastRow.focus();
  }

  /* Make every course row clickable (mouse, touch and keyboard) */
  rows.forEach(function (row) {
    row.classList.add('cr-click');
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    row.addEventListener('click', function () { openModal(row); });
    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(row);
      }
    });
  });

  elClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('cr-open')) closeModal();
  });
})();