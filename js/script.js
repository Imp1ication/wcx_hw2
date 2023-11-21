function fetchResumeContent(id, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../downloads/resume.xml", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;

      var content = xmlDoc.querySelector(id).textContent;
      content = content.replace(/\n/g, "<br />");

      callback(content);
    }
  };

  xhr.send();
}

function updateExperienceSection() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../downloads/resume.xml", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      updateEducationStatus(xmlDoc);
      updateExperienceStatus(xmlDoc);
    }
  };
  xhr.send();
}

function updateExperienceStatus(xmlDoc) {
  var experiences = xmlDoc.getElementsByTagName("experience");

  var expBox = document.querySelector(".exp-column .exp-box");
  expBox.innerHTML = "";
  for (var i = 0; i < experiences.length; ++i) {
    var experience = experiences[i];

    var jobTitle = experience.getElementsByTagName("jobTitle")[0].textContent;
    var company = experience.getElementsByTagName("company")[0].textContent;
    var startDate = experience.getElementsByTagName("startDate")[0].textContent;
    var endDate = experience.getElementsByTagName("endDate")[0].textContent;
    var responsibilities = experience.getElementsByTagName("responsibility");
    var description =
      experience.getElementsByTagName("description")[0].textContent;

    var expContent = document.createElement("div");
    expContent.className = "exp-content";

    var content = document.createElement("div");
    content.className = "content";

    var year = document.createElement("div");
    year.className = "year";
    year.innerHTML = `<i class="bx bx-calendar"></i> ${startDate}-${endDate}`;

    var h3 = document.createElement("h3");
    h3.innerHTML = `${jobTitle} <small>${company}</small>`;

    content.appendChild(year);
    content.appendChild(h3);

    if (responsibilities.length > 0) {
      var ul = document.createElement("ul");
      for (var j = 0; j < responsibilities.length; ++j) {
        var li = document.createElement("li");
        li.textContent = responsibilities[j].textContent;
        ul.appendChild(li);
      }
      content.appendChild(ul);
    }

    var p = document.createElement("p");
    p.innerHTML = description;

    content.appendChild(p);

    expContent.appendChild(content);
    expBox.appendChild(expContent);
  }
}

function updateEducationStatus(xmlDoc) {
  var educations = xmlDoc.getElementsByTagName("education");

  var eduBox = document.querySelector(".edu-column .exp-box");
  eduBox.innerHTML = "";

  for (var i = 0; i < educations.length; ++i) {
    var education = educations[i];

    var school = education.getElementsByTagName("school")[0].textContent;
    var department =
      education.getElementsByTagName("department")[0].textContent;
    var entranceYear =
      education.getElementsByTagName("entranceYear")[0].textContent;
    var graduationYear =
      education.getElementsByTagName("graduationYear")[0].textContent;
    var specialExperiences =
      education.getElementsByTagName("specialExperience");

    var expContent = document.createElement("div");
    expContent.className = "exp-content";

    var content = document.createElement("div");
    content.className = "content";

    var year = document.createElement("div");
    year.className = "year";
    year.innerHTML = `<i class="bx bx-calendar"></i> ${entranceYear}-${graduationYear}`;

    var h3 = document.createElement("h3");
    h3.innerHTML = `${school} <small>${department}</small>`;

    content.appendChild(year);
    content.appendChild(h3);

    if (specialExperiences.length > 0) {
      var ul = document.createElement("ul");
      for (var j = 0; j < specialExperiences.length; ++j) {
        var li = document.createElement("li");
        li.textContent = specialExperiences[j].textContent;
        ul.appendChild(li);
      }
      content.appendChild(ul);
    }

    expContent.appendChild(content);
    eduBox.appendChild(expContent);
  }
}

function updateSkillsSection() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../downloads/resume.xml", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      updateSkillsStatus(xmlDoc);
    }
  };
  xhr.send();
}

function updateSkillsStatus(xmlDoc) {
  var programmingLanguages = xmlDoc.getElementsByTagName("programmingLanguage");
  var skillsContent = document.querySelector(".skills-content");
  skillsContent.innerHTML = "";

  for (var i = 0; i < programmingLanguages.length; ++i) {
    var language = programmingLanguages[i];

    var name = language.getElementsByTagName("name")[0].textContent;
    var proficiency =
      language.getElementsByTagName("proficiency")[0].textContent;

    var progress = document.createElement("div");
    progress.className = "progress";

    var h3 = document.createElement("h3");
    h3.innerHTML = `${name}<span>${proficiency}%</span>`;

    var bar = document.createElement("div");
    bar.className = "bar";

    var span = document.createElement("span");
    span.style.width = proficiency + "%";

    bar.appendChild(span);
    progress.appendChild(h3);
    progress.appendChild(bar);

    skillsContent.appendChild(progress);
  }
}
