
document.addEventListener("DOMContentLoaded", function(event)
{

    /*Code pour le jeu*/

    class Jeu
    {
        constructor(_idSvg, _idPointage)
        {
            console.log("Jeu");
            this.s = Snap(_idSvg); //propriété à garder en mémoire.
            this.sortiPointage = document.querySelector(_idPointage);
            this.grandeurCarre = 20;
            this.grandeurGrille = 15;
        }

        nouvellePartie()
        {
            this.finPartie();
            this.affichagePointage(1);
            this.pomme = new Pomme(this);
            this.serpent = new Serpent(this);


        }

        /*fonctionnalité pour le début de la partie (méthode).*/

        finPartie()
        {
            if(this.pomme !== undefined)
            {
                this.pomme.supprimePomme();
                this.pomme = undefined;
            }


        }

        /*fonctionnalité pour la fin de la partie (méthode).*/

        affichagePointage(_lePointage)
        {
            this.sortiPointage.innerHTML = _lePointage;

        }

        /*fonctionnalité pour le pointage durant la partie (méthode).*/
    }

    /*Code pour le serpent*/

    class Serpent
    {
        constructor(_leJeu)
        {
            console.log("Serpent");
            this.leJeu = _leJeu;

        }
        verifTouche(evt)
        {

        }

        deplacement(driCode)
        {

        }

        controleSerpent()
        {

        }

        dessineCarre(x, y)
        {

        }

        supprimeSerpent()
        {

        }

    }

    /*Code pour la pomme*/

    class Pomme
    {
        constructor(_leJeu)
        {
            console.log("Pomme");
            this.leJeu = _leJeu;
            this.pommeEden = [];
            this.ajoutePomme();
        }

        ajoutePomme()
        {
            var posX = Math.floor(Math.random() * this.leJeu.grandeurGrille );
            var posY = Math.floor(Math.random() * this.leJeu.grandeurGrille );

            this.pommeEden = [this.leJeu.s.rect(posX * this.leJeu.grandeurCarre, posY * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre).attr({fill:"red"}), posX, posY];

        }
        supprimePomme()
        {
            this.pommeEden[0].remove();

        }

    }

    var unePartie = new Jeu("#jeu", "#pointage");
    var btnJouer = document.querySelector("#btnJouer");
    btnJouer.addEventListener("click", nouvellePartie);
    function nouvellePartie()
    {
        unePartie.nouvellePartie();
    }

});