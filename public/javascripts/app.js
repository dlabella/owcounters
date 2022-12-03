(function () {
    var roles = [
        {name:"Tank"},
        {name:"Dps"},
        {name:"Support"}
    ];
    var heroes = [
        { name: "Dva", role: "Tank", counters: [] },
        { name: "Reinhardt", role: "Tank", counters: [] },
        { name: "Moira", role: "Support", counters: [] },
        { name: "Kiriko", role: "Support", counters: [] },
    ]
    document.addEventListener("DOMContentLoaded", init);
    var self = this;
    self.gridContainer = {};
    self.mainGridTemplate = {};
    self.heroTemplate = {};

    function init() {
        self.gridContainer = document.getElementById("hero-grid-container");
        self.mainGridTemplate = document.getElementById("hero-grid-template");
        self.heroTemplate = document.getElementById("hero-template");
        roles.forEach(role => {
            buildRoleGrid(role)
        });
    };

    function buildRoleGrid(role) {
        
        var roleContainer = self.mainGridTemplate.content.children[0].cloneNode(true);
        var heroesContainer = roleContainer.querySelector(".hero-grid");

        var roleHeroes = heroes.filter((hero) => hero.role.toLocaleLowerCase() === role.name.toLocaleLowerCase());
        roleHeroes.forEach(hero => {
            buildHeroItem(heroesContainer, hero);
        });
        processTemplate(roleContainer, role);
        self.gridContainer.appendChild(roleContainer);
    }

    function buildHeroItem(container, hero) {
        var heroEl = self.heroTemplate.content.children[0].cloneNode(true);
        processTemplate(heroEl, hero);
        container.appendChild(heroEl);
    }
    function processTemplate(el, data) {
        var html = el.innerHTML;
        for (var key in data) {
            html = html.replace("{{" + key + "}}", data[key]);
        }
        el.innerHTML = html;
    }
})();