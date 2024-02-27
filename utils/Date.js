function tempsEcoule(dateCible) {
    const maintenant = new Date();
    const datePassee = new Date(dateCible);
    const differenceEnSecondes = Math.floor((maintenant - datePassee) / 1000);
    const minute = 60;
    const heure = minute * 60;
    const jour = heure * 24;
    const mois = jour * 30;
    const annee = jour * 365;
  
    if (differenceEnSecondes < minute) {
      return 'Il y a moins d\'une minute';
    } else if (differenceEnSecondes < heure) {
      return `Il y a ${Math.floor(differenceEnSecondes / minute)} minutes`;
    } else if (differenceEnSecondes < jour) {
      return `Il y a ${Math.floor(differenceEnSecondes / heure)} heures`;
    } else if (differenceEnSecondes < mois) {
      return `Il y a ${Math.floor(differenceEnSecondes / jour)} jours`;
    } else if (differenceEnSecondes < annee) {
      return `Il y a ${Math.floor(differenceEnSecondes / mois)} mois`;
    } else {
      return `Il y a ${Math.floor(differenceEnSecondes / annee)} ans`;
    }
  }

  export default tempsEcoule;