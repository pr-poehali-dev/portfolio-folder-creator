const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
  'https://cdn.poehali.dev/files/2aa0ba53-f41b-4a2f-bc39-a20747d14638.jpg',
  'https://cdn.poehali.dev/files/654a54c8-3e46-42bb-a05d-3f2fcb803da8.jpg',
  'https://cdn.poehali.dev/files/0a87c9a0-2d65-4120-af0c-acc1a212edd1.jpg',
  'https://cdn.poehali.dev/files/d8901404-77f4-45ac-9825-c975d8152a35.jpg',
  'https://cdn.poehali.dev/files/1a5f4f2c-a968-49c1-b10d-14434f34a1bc.jpg',
  'https://cdn.poehali.dev/files/8964ce2d-5e1e-4d90-b74d-c8bd0a981649.jpg',
  'https://cdn.poehali.dev/files/994cfb02-b2ff-4a9c-b2d4-d0ac6cd04046.jpg',
  'https://cdn.poehali.dev/files/a8b1995a-ff21-4120-8eeb-db1910d97ae6.jpg',
  'https://cdn.poehali.dev/files/2a69d09f-812c-4e53-a721-97813f5e3781.jpg',
  'https://cdn.poehali.dev/files/88abf1ab-defb-4733-a676-821d074aa2d8.jpg',
  'https://cdn.poehali.dev/files/4538f55e-ea36-4043-8200-12cee39f756b.jpg',
  'https://cdn.poehali.dev/files/2990bad5-aed1-49e4-ba93-bce7469f338a.jpg',
  'https://cdn.poehali.dev/files/7898d59a-cced-4940-86b5-23e406f38a8a.jpg',
  'https://cdn.poehali.dev/files/fcb72d82-00a7-4fa4-87c8-f49383415b19.jpg',
  'https://cdn.poehali.dev/files/10c2d4d2-7003-493d-9910-9979fd30c10c.jpg',
  'https://cdn.poehali.dev/files/6a3c6f92-729d-49f9-9142-7ecdc1a9697f.jpg',
  'https://cdn.poehali.dev/files/d07bc2c3-545e-436b-843f-dc1322e6077d.jpg',
  'https://cdn.poehali.dev/files/f4308aac-8e9a-48eb-847f-9532034b3fcb.jpg',
  'https://cdn.poehali.dev/files/c6cb92dc-d272-425a-949f-fbc99247a2a1.jpg',
  'https://cdn.poehali.dev/files/c9dd445e-d7d2-4522-b5e7-f38c6e366c85.jpg',
  'https://cdn.poehali.dev/files/f9767041-83ee-4c80-9858-d28620bcf955.jpg',
  'https://cdn.poehali.dev/files/f31daa92-1fd9-4a44-9c95-2e80cb49bed2.jpg',
  'https://cdn.poehali.dev/files/ba794c75-9a07-4474-8612-a7288fbb5d41.jpg',
  'https://cdn.poehali.dev/files/38aafc07-ff10-4edd-b51d-3d7e94d9ffee.jpg',
  'https://cdn.poehali.dev/files/7a10b93f-70e5-431b-8602-58d0e762a2d8.jpg',
  'https://cdn.poehali.dev/files/2e6e7055-c11a-4b1b-a596-2a2cef8e4fde.jpg',
  'https://cdn.poehali.dev/files/d8e47894-46cf-44cd-9994-f8804d981297.jpg',
  'https://cdn.poehali.dev/files/46339c57-487a-4cb1-8ad1-bab82a336226.jpg'
];

const outputDir = path.join(__dirname, 'public', 'img');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const filename = path.basename(url);
    const filepath = path.join(outputDir, filename);
    
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const downloadAll = async () => {
  let successCount = 0;
  let failedCount = 0;
  const errors = [];
  
  for (const url of urls) {
    try {
      await downloadImage(url);
      successCount++;
    } catch (error) {
      failedCount++;
      errors.push({ url, error: error.message });
      console.error(`Error downloading ${url}:`, error.message);
    }
  }
  
  console.log(`\n=== Download Summary ===`);
  console.log(`Successfully downloaded: ${successCount} images`);
  console.log(`Failed: ${failedCount} images`);
  
  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(({ url, error }) => {
      console.log(`- ${path.basename(url)}: ${error}`);
    });
  }
};

downloadAll().catch(console.error);
