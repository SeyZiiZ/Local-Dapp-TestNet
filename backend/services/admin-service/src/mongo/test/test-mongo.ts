import mongoose from 'mongoose';
import { configDotenv, DotenvConfigOptions } from 'dotenv';

configDotenv({path: "../../.env"});

const uri = process.env.MONGOURI || "";

if (!uri) {
  throw new Error('❌ URI MongoDB non définie dans .env (MONGOURI)');
}

async function testMongoConnection() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connexion MongoDB réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB :', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Déconnexion MongoDB');
  }
}

testMongoConnection();