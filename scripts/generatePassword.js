const bcrypt = require('bcryptjs');

// Generate a hash for the password "admin123"
// You should change this to your desired password
const password = process.argv[2] || 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  
  console.log('\nPassword hash generated!');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nUpdate data/admin.json with this hash.');
});
