export const fetchTrackPreview = async (artist, title) => {
  try {
    const query = encodeURIComponent(`${artist} ${title}`);
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
    const data = await response.json();
    return data.results[0]?.previewUrl || null;
  } catch (e) {
    console.error("Music API Fetch Error:", e);
    return null;
  }
};
