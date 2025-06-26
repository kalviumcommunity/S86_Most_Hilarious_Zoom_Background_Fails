const { sequelize } = require('./config/Database');
const User = require('./models/User');
const Comment = require('./models/comment');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
      { name: 'dinesh' },
      { name: 'khalid' },
      { name: 'yeswanth' },
    ]);

    await Comment.bulkCreate([
      { author: 'dinesh', text: 'nothing', created_by: users[0].id },
      { author: 'dinesh', text: 'nothing', created_by: users[1].id },
      { author: 'dinesh', text: 'well work', created_by: users[2].id },
    ]);

    console.log('✅ Seeded successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    process.exit();
  }
}

seed();
