(function () {
  var projects = [
    {
      name: "Discord Bot",
      description: "A Discord bot built with Python that handles moderation, commands, and server utilities.",
      tech: ["Python", "Discord API", "SQLite"],
      links: [
        { label: "Source", href: "[GITHUB URL]" }
      ]
    },
    {
      name: "FastAPI Service",
      description: "A REST API built with FastAPI that exposes [PROJECT DESCRIPTION]. Includes [AUTH/FEATURE] and [FEATURE].",
      tech: ["Python", "FastAPI", "PostgreSQL"],
      links: [
        { label: "Source", href: "[GITHUB URL]" },
        { label: "Live demo", href: "[LIVE URL]" }
      ]
    },
    {
      name: "Node.js App",
      description: "A Node.js application that [PROJECT DESCRIPTION]. Built with Express and [DATABASE/TECH].",
      tech: ["JavaScript", "Node.js", "Express"],
      links: [
        { label: "Source", href: "[GITHUB URL]" }
      ]
    },
    {
      name: "Automation Tool",
      description: "A Python automation tool that [PROJECT DESCRIPTION]. Runs on a [SCHEDULE] to [WHAT IT DOES].",
      tech: ["Python", "SQLite", "[LIBRARY]"],
      links: [
        { label: "Source", href: "[GITHUB URL]" }
      ]
    }
  ];

  var stack = [
    { group: "Languages", items: ["Python", "JavaScript"] },
    { group: "Backend", items: ["FastAPI", "Node.js", "Express"] },
    { group: "Databases", items: ["PostgreSQL", "SQLite"] },
    { group: "Tools", items: ["Git"] }
  ];

  var PAGE_SIZE = 6;
  var projectsPage = 1;

  function renderProjects(container, data, page) {
    var start = (page - 1) * PAGE_SIZE;
    data.slice(start, start + PAGE_SIZE).forEach(function (project) {
      var card = document.createElement("article");
      card.className = "project-card";

      var title = document.createElement("h3");
      title.className = "project-name";
      title.textContent = project.name;

      card.appendChild(title);

      var description = document.createElement("p");
      description.className = "project-description";
      description.textContent = project.description;

      var tech = document.createElement("ul");
      tech.className = "tech-list";
      tech.setAttribute("aria-label", "Technologies used");
      project.tech.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        tech.appendChild(li);
      });

      var links = document.createElement("div");
      links.className = "project-links";
      project.links.forEach(function (link) {
        var a = document.createElement("a");
        a.className = "project-link";
        a.href = link.href;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = link.label;
        links.appendChild(a);
      });

      card.appendChild(description);
      card.appendChild(tech);
      card.appendChild(links);

      container.appendChild(card);
    });
  }

  function renderStack(container, data) {
    data.forEach(function (group) {
      var groupEl = document.createElement("div");
      groupEl.className = "stack-group";

      var title = document.createElement("h3");
      title.className = "stack-group-title";
      title.textContent = group.group;

      var list = document.createElement("ul");
      list.className = "stack-list";
      group.items.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });

      groupEl.appendChild(title);
      groupEl.appendChild(list);

      container.appendChild(groupEl);
    });
  }

  var chevronLeft =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>';

  var chevronRight =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>';

  function renderPagination(container, data, page) {
    var totalPages = Math.ceil(data.length / PAGE_SIZE);
    if (totalPages <= 1) {
      container.hidden = true;
      return;
    }
    container.hidden = false;
    container.textContent = "";

    var prev = document.createElement("button");
    prev.type = "button";
    prev.className = "page-arrow";
    prev.setAttribute("aria-label", "Previous page");
    prev.disabled = page === 1;
    prev.innerHTML = chevronLeft;
    prev.addEventListener("click", function () {
      projectsPage -= 1;
      updateProjects();
    });

    var info = document.createElement("span");
    info.className = "page-info";
    info.textContent = "Page " + page + " of " + totalPages;

    var next = document.createElement("button");
    next.type = "button";
    next.className = "page-arrow";
    next.setAttribute("aria-label", "Next page");
    next.disabled = page === totalPages;
    next.innerHTML = chevronRight;
    next.addEventListener("click", function () {
      projectsPage += 1;
      updateProjects();
    });

    container.appendChild(prev);
    container.appendChild(info);
    container.appendChild(next);
  }

  function updateProjects() {
    var totalPages = Math.ceil(projects.length / PAGE_SIZE);
    if (projectsPage > totalPages) {
      projectsPage = totalPages;
    }
    var grid = document.getElementById("projects-grid");
    grid.textContent = "";
    renderProjects(grid, projects, projectsPage);
    renderPagination(
      document.getElementById("projects-pagination"),
      projects,
      projectsPage
    );
  }

  updateProjects();
  renderStack(document.getElementById("stack-grid"), stack);

  var nav = document.getElementById("primary-nav");
  var navToggle = document.getElementById("nav-toggle");

  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === id);
    });
  }

  var lastHref = navLinks[navLinks.length - 1].getAttribute("href");

  function updateActive() {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
      setActive(lastHref);
      return;
    }
    var marker = window.scrollY + window.innerHeight * 0.45;
    var current = navLinks[0].getAttribute("href");
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) {
        current = "#" + section.id;
      }
    });
    setActive(current);
  }

  window.addEventListener("scroll", updateActive);
  updateActive();

  document.getElementById("year").textContent = new Date().getFullYear();
})();
