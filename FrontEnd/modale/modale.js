// Variables pour les deux modales
const modalGaleriePhoto = document.getElementById('modalGaleriePhoto');
const modalAjoutPhoto = document.getElementById('modalAjoutPhoto');
const openModalBtn = document.getElementById('openModalBtn');
const openModalAjoutPhoto = document.getElementById('openModalAjoutPhoto');
const closeModalBtn1 = document.getElementById('closeModalBtn1');
const closeModalBtn2 = document.getElementById('closeModalBtn2');

// Conteneur pour les photos importées dans la modale 1
const uploadedPhotosContainer = document.getElementById('uploadedPhotosContainer');

// Conteneur pour l'aperçu de la photo dans la modale 2
const photoPreviewContainer = document.getElementById('photoPreviewContainer');

// Message de confirmation
const uploadMessage = document.getElementById('uploadMessage');

// Input de fichier dans la modale 2
const fileInput = document.querySelector('.custom-file-input');

// Icône d'image
const imageIcon = document.getElementById('image-icon');

// Fonction pour afficher la première modale
export function showModal() {
    modalGaleriePhoto.style.display = "block";
    if (showModal === true) {
        return adminMode();
    }
}

// Fonction pour fermer les modales en cliquant sur le bouton de fermeture ou à l'extérieur de la modale
export function closeModal(e) {
    if (e.target === modalGaleriePhoto || e.target === closeModalBtn1) {
        modalGaleriePhoto.style.display = 'none';
    } else if (e.target === modalAjoutPhoto || e.target === closeModalBtn2) {
        modalAjoutPhoto.style.display = 'none';
    }
}

// Fonction pour activer le mode admin
export function adminMode() {
    // Afficher le bandeau noir avec icône et mode édition
    const blackLine = document.createElement("div");
    blackLine.id = "blackLine";
    blackLine.textContent = "Mode Édition";
    document.body.prepend(blackLine);
}

// Ouvrir la première modale (Galerie Photo) lorsque le bouton est cliqué
openModalBtn.addEventListener('click', () => {
    modalGaleriePhoto.style.display = 'block';
});

// Ouvrir la deuxième modale (Ajout Photo) à partir de la première
openModalAjoutPhoto.addEventListener('click', () => {
    modalGaleriePhoto.style.display = 'none';
    modalAjoutPhoto.style.display = 'block';
});

// Fermer la première modale (Galerie Photo)
closeModalBtn1.addEventListener('click', () => {
    modalGaleriePhoto.style.display = 'none';
});

// Fermer la deuxième modale (Ajout Photo)
closeModalBtn2.addEventListener('click', () => {
    modalAjoutPhoto.style.display = 'none';
});

// Fermer les modales si on clique en dehors de celles-ci
window.addEventListener('click', (event) => {
    if (event.target === modalGaleriePhoto) {
        modalGaleriePhoto.style.display = 'none';
    }
    if (event.target === modalAjoutPhoto) {
        modalAjoutPhoto.style.display = 'none';
    }
});

// Fonction pour afficher l'aperçu de la photo dans la modale 2
function showPhotoPreview(imageSrc) {
    photoPreviewContainer.innerHTML = ''; // Effacer l'aperçu précédent
    const imgElement = document.createElement('img');
    imgElement.src = imageSrc;
    photoPreviewContainer.appendChild(imgElement);
}

// Fonction pour afficher un message de confirmation
function showUploadMessage() {
    uploadMessage.textContent = "Photo téléchargée avec succès !";
    uploadMessage.style.display = "block";
}

// Fonction pour ajouter une photo à la galerie
function addPhotoToGallery(imageSrc) {
    const imgElement = document.createElement('img');
    imgElement.src = imageSrc;
    uploadedPhotosContainer.appendChild(imgElement);
}

// Gestion de l'importation d'une photo
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            showPhotoPreview(e.target.result);  // Afficher l'aperçu dans la modale 2
            addPhotoToGallery(e.target.result); // Ajouter la photo à la galerie (modale 1)
            showUploadMessage();  // Afficher le message de confirmation
            
            // Masquer l'icône et afficher l'aperçu
            imageIcon.style.display = 'none';
            photoPreviewContainer.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
});

//A FAIRE vendredi 23 AOUT = >
// pas de validation si pas de titre et catégorie
// il faut que la grille des photos ajoutées corresponde à celle de la home page
// implementer les poubelles pour supprimer les photos 
// mode edition n'apparait que pour l'admin
// le bouton valider de la modale 2 permet retourne à la home page
// faire disparaitre jpeg et "+ ajouter photo" quand l'aperçu de la photo apparait
// agrandir la croix qui ferme les modales
// mettre une fleche retour dans la modale 2 pour retourner dans la modale 1 <i class="fa-solid fa-arrow-left"></i>


