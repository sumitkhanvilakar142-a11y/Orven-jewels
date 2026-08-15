const username = "sumitkhanvilakar142-a11y";
const repo = "Orven-jewels";

async function loadFolderImages(folderName) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '<p>Loading images...</p>';

  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folderName}`);
    const files = await response.json();

    gallery.innerHTML = '';
    files.forEach(file => {
      if (file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const img = document.createElement('img');
        img.src = file.download_url;
        img.loading = "lazy";
        gallery.appendChild(img);
      }
    });
  } catch (error) {
    gallery.innerHTML = '<p>Images load karne me error aaya.</p>';
  }
}
