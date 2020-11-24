
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

            if(this.serpent !== undefined)
            {
                this.serpent.supprimeSerpent();
                this.serpent = undefined;

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
            this.currentX = -1;
            this.currentY = 0;

            this.nextMoveX = 1;
            this.nextMoveY = 0;

            this.serpentlongueur = 1;
            this.tblCarreSerpent = [];

            this.touche = false;

            this.vitesse = 250;
            this.timing = setInterval(this.controleSerpent.bind(this), this.vitesse);
            document.addEventListener("keydown", this.verifTouche.bind(this));


        }
        verifTouche(_evt)
        {
            var evt = _evt;
            console.log(evt.keyCode);
            this.deplacement(evt.keyCode);

        }

        deplacement(driCode)
        {
            switch(driCode)
            {



                case 37:
                    this.nextMoveX = -1;
                    this.nextMoveY = 0;
                    break;

                case 38:
                    this.nextMoveX = 0;
                    this.nextMoveY = -1;
                    break;

                case 39:
                    this.nextMoveX = 1;
                    this.nextMoveY = 0;
                    break;

                case 40:
                    this.nextMoveX = 0;
                    this.nextMoveY = 1;
                    break;
            }

            //console.log(this.nextMoveX, this.nextMoveY);


        }

        controleSerpent()
        {
           var nextX = this.currentX + this.nextMoveX;
           var nextY = this.currentY + this.nextMoveY;

           this.tblCarreSerpent.forEach(function(element)
            {
              if(nextX === element[1] && nextY === element[2])
              {
                  this.leJeu.finPartie();
                  this.touche = true;

              }
            }.bind(this));

           if(nextY < 0 || nextX < 0 || nextY > this.leJeu.grandeurGrille - 1 || nextX > this.leJeu.grandeurGrille - 1) //vérifie les limitess du serpent sir la grille.
           {
               console.log("touche limites");
               this.leJeu.finPartie();
               this.touche = true;

           }

           if(!this.touche)
           {
               if(this.currentX === this.leJeu.pomme.pommeEden[1] && this.currentY === this.leJeu.pomme.pommeEden[2])
               {
                   this.serpentlongueur++;
                   this.leJeu.affichagePointage(this.serpentlongueur);
                   this.leJeu.pomme.supprimePomme();
                   this.leJeu.pomme.ajoutePomme();

               }
               this.dessineCarre(nextX, nextY);
               this.currentX = nextX;
               this.currentY = nextY;
           }




        }

        dessineCarre(x, y)
        {
            var unCarre = [this.leJeu.s.rect(x * this.leJeu.grandeurCarre, y * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre), x, y];
            this.tblCarreSerpent.push(unCarre);
            if(this.tblCarreSerpent.length > this.serpentlongueur)
            {
                this.tblCarreSerpent[0][0].remove();
                this.tblCarreSerpent.shift();

            }

        }

        supprimeSerpent()
        {
            clearInterval(this.timing);
            while (this.tblCarreSerpent.length > 0)
            {
                this.tblCarreSerpent[0][0].remove();
                this.tblCarreSerpent.shift();
            }

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