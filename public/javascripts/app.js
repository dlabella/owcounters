(function () {
    var roles = [
        { name: "Tank",image:"/images/icon-role-tank.svg" },
        { name: "Damage",image:"/images/icon-role-damage.svg" },
        { name: "Support",image:"/images/icon-role-support.svg" }
    ];
    var heroes = [
        { name: "ana", role: "support", counters: ["doomfist", "echo", "genji", "lucio", "pharah","sombra","tracer"], image: "" },
        { name: "ashe", role: "damage", counters: ["doomfist","echo","genji","reaper","roadhogh","soldier","sombra","tracer"], image: "" },
        { name: "baptiste", role: "support", counters: ["ana","echo","genji","hanzo","lucio","pharah","reaper","roadhogh","sombra","tracer"], image: "" },
        { name: "bastion", role: "damage", counters: ["ana","genji","junkrat","phara","roadhog","sombra","tracer","zarya"], image: "" },
        { name: "brigitte", role: "support", counters: ["cassidy","dva","echo","genji","junkrat","moira","pharah","sombra","tracer","widowmaker"], image: "" },
        { name: "cassidy", role: "damage", counters: ["ana","ashe","bastion","genji","hanzo","pharah","widowmaker"], image: "" },
        { name: "doomfist", role: "damage", counters: ["ana","ashe","brigitte","cassidy","mei","pharah","roadhog"], image: "" },
        { name: "dva", role: "tank", counters: ["brigitte","doofist","moira","reaper","roadhog","symmetra","winston","zarya"], image: "" },
        { name: "echo", role: "damage", counters: ["ana","ashe","baptiste","cassidy","dva","junkerqueen","moira","reaper","soldier","widowmaker","zarya"], image: "" },
        { name: "genji", role: "damage", counters: ["brigitte","mei","moira","symmetra","winston","zarya"], image: "" },
        { name: "hanzo", role: "damage", counters: ["dva","genji","lucio","moira","phara","sombra","tracer","wrekingball"], image: "" },
        { name: "junkerqueen", role: "tank", counters: ["ana","ashe","baptiste","cassidy","pharah","soldier","widowmaker","zenyatta"], image: "" },
        { name: "junkrat", role: "damage", counters: ["ashe","cassidy","echo","genji","lucio","pharah","reaper","roadhog","soldier","sombra","tracer","wrekingball"], image: "" },
        { name: "kiriko", role: "support", counters: ["ana","ashe","baptiste","cassidy","genji","moira","reaper","sojourn","tracer","widowmaker"], image: "" },
        { name: "lucio", role: "support", counters: ["ashe","baptiste","cassidy","moira","soldier","symmetra","winston","zarya"], image: "" },
        { name: "mei", role: "damage", counters: ["echo","pharah","reaper","sombra","tracer"], image: "" },
        { name: "mercy", role: "support", counters: ["ana","ashe","baptiste","cassidy","genji","moira","reaper","roadhog","soldier","winston"], image: "" },
        { name: "moira", role: "support", counters: ["ana","echo","genji","pharah","raper","roadhog","sombra"], image: "" },
        { name: "orisa", role: "tank", counters: ["ana","ashe","baptiste","echo","hanzo","pharah","reaper","sojourn","sombra","soldier","widowmaker","zenyatta"], image: "" },
        { name: "pharah", role: "damage", counters: ["ana","ashe","baptiste","soldier","widowmaker"], image: "" },
        { name: "reaper", role: "damage", counters: ["ana","ashe","junkrat","pharah","widowmaker"], image: "" },
        { name: "reinhardt", role: "tank", counters: ["ana","ashe","junkrat","mei","pharah","reaper","sombra","tracer"], image: "" },
        { name: "roadhog", role: "tank", counters: ["ana","genji","echo","junkrat","pharah","reaper","sombra","tracer","widowmaker"], image: "" },
        { name: "sigma", role: "tank", counters: ["genji","lucio","moira","sombra","symmetra","tracer","zarya"], image: "" },
        { name: "sojourn", role: "damage", counters: ["dva","lucio","orisa","reaper","sigma","sombra","zarya"], image: "" },
        { name: "soldier", role: "damage", counters: ["ana","cassidy","junkrat","reaper","roadhog","widowmaker"], image: "" },
        { name: "sombra", role: "damage", counters: ["ana","brigitte","hanzo","junkrat","mei","moira","pharah","winston"], image: "" },
        { name: "symmetra", role: "damage", counters: ["echo","junkrat","pharah","reaper","sombra","tracer","winston"], image: "" },
        { name: "torbjorn", role: "damage", counters: ["ana","junkrat","pharah","sombra","windomaker"], image: "" },
        { name: "tracer", role: "damage", counters: ["ana","junkrat","pharah","sombra","widowmaker"], image: "" },
        { name: "widowmaker", role: "damage", counters: ["genji","reaper","sombra","tracer"], image: "" },
        { name: "winston", role: "tank", counters: ["ana","brigitte","mei","reaper","roadhog"], image: "" },
        { name: "wreckingball", role: "tank", counters: ["ana","brigitte","mei","roadhog"], image: "" },
        { name: "zarya", role: "tank", counters: ["ashe","bastion","dva","echo","junkrat","pharah","widowmaker"], image: "" },
        { name: "zenyatta", role: "support", counters: ["dva","echo","genji","tracer","widowaker"], image: "" },
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
    };

    function buildHeroItem(container, hero) {
        var heroEl = self.heroTemplate.content.children[0].cloneNode(true);
        processTemplate(heroEl, hero);
        heroEl.dataset.hero = hero.name;
        container.appendChild(heroEl);
    };

    function processTemplate(el, data) {
        var html = el.innerHTML;
        for (var key in data) {
            html = html.replace("{{" + key + "}}", data[key]);
        }
        el.innerHTML = html;
    };

    function heroClick(evt) {
        var el = evt.currentTarget;
        
        if (!el.classList.contains("selected")){
            clearSelected();
            showCounters(el);
        }else{
            clearSelected();
            enableAllHeroes();
        }
    };

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
    };

    function clearSelected(){
        var heroesSelected = document.querySelectorAll(".hero.selected");
        for(var hero of heroesSelected){
            hero.classList.remove("selected");
        }
    };

    function disableAllHeroes(selected) {
        var heroes = document.querySelectorAll(".hero");
        for (var hero of heroes) {
            if (hero!==selected) {
                hero.classList.add("disabled");
            }
        }
    };

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