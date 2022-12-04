(function () {
    var roles = [
        { name: "Tank" },
        { name: "Dps" },
        { name: "Support" }
    ];
    var heroes = [
        { name: "ana", role: "support", counters: ["dva", "reinhardt"], image: "" },
        { name: "ashe", role: "dps", counters: [], image: "" },
        { name: "baptiste", role: "support", counters: [], image: "" },
        { name: "bastion", role: "dps", counters: [], image: "" },
        { name: "brigitte", role: "support", counters: [], image: "" },
        { name: "doomfist", role: "dps", counters: [], image: "" },
        { name: "dva", role: "tank", counters: [], image: "" },
        { name: "echo", role: "dps", counters: [], image: "" },
        { name: "genji", role: "dps", counters: [], image: "" },
        { name: "hanzo", role: "dps", counters: [], image: "" },
        { name: "junkerqueen", role: "tank", counters: [], image: "" },
        { name: "junkrat", role: "dps", counters: [], image: "" },
        { name: "kiriko", role: "support", counters: [], image: "" },
        { name: "lucio", role: "support", counters: [], image: "" },
        { name: "cassidy", role: "dps", counters: [], image: "" },
        { name: "mei", role: "dps", counters: [], image: "" },
        { name: "mercy", role: "support", counters: [], image: "" },
        { name: "moira", role: "support", counters: [], image: "" },
        { name: "orisa", role: "tank", counters: [], image: "" },
        { name: "pharah", role: "dps", counters: [], image: "" },
        { name: "reaper", role: "dps", counters: [], image: "" },
        { name: "reinhardt", role: "tank", counters: [], image: "" },
        { name: "roadhog", role: "tank", counters: [], image: "" },
        { name: "sigma", role: "tank", counters: [], image: "" },
        { name: "sojourn", role: "dps", counters: [], image: "" },
        { name: "soldier", role: "dps", counters: [], image: "" },
        { name: "sombra", role: "dps", counters: [], image: "" },
        { name: "symmetra", role: "dps", counters: [], image: "" },
        { name: "torbjorn", role: "dps", counters: [], image: "" },
        { name: "tracer", role: "dps", counters: [], image: "" },
        { name: "widowmaker", role: "dps", counters: [], image: "" },
        { name: "winston", role: "tank", counters: [], image: "" },
        { name: "wreckingball", role: "tank", counters: [], image: "" },
        { name: "zarya", role: "tank", counters: [], image: "" },
        { name: "zenyatta", role: "support", counters: [], image: "" },
    ];
    loadHeroIcons(heroes);

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
        attachEvents();
    };
    function loadHeroIcons(heroes) {
        for (var hero of heroes) {
            hero.image = "/images/ow2/hero-" + hero.name.toLocaleLowerCase() + ".png";
        }
    }

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
        heroEl.dataset.hero = hero.name;
        container.appendChild(heroEl);
    }
    function processTemplate(el, data) {
        var html = el.innerHTML;
        for (var key in data) {
            html = html.replace("{{" + key + "}}", data[key]);
        }
        el.innerHTML = html;
    }
    function heroClick(evt) {
        var el = evt.currentTarget;
        
        if (!el.classList.contains("selected")){
            clearSelected();
            showCounters(el);
        }else{
            clearSelected();
            enableAllHeroes();
        }
    }

    function showCounters(el){
        var heroName = el.dataset.hero;
        var hero = heroes.find((hero) => hero.name === heroName);
        el.classList.add("selected");
        disableAllHeroes(el);
        for (var counter of hero.counters) {
            var counterEl = document.querySelector("[data-hero='" + counter + "']");
            if (counterEl) {
                counterEl.classList.remove("disabled");
            }
        }
    }
    function clearSelected(){
        var heroesSelected = document.querySelectorAll(".hero.selected");
        for(var hero of heroesSelected){
            hero.classList.remove("selected");
        }
    }
    function disableAllHeroes(selected) {
        var heroes = document.querySelectorAll(".hero");
        for (var hero of heroes) {
            if (hero!==selected) {
                hero.classList.add("disabled");
            }
        }
    }
    function enableAllHeroes() {
        var heroes = document.querySelectorAll(".hero");
        for (var hero of heroes) {
            hero.classList.remove("disabled");
        }
    }
    function attachEvents() {
        var heroes = document.querySelectorAll(".hero");
        for (var hero of heroes) {
            hero.addEventListener("click", heroClick);
        }
    }
})();