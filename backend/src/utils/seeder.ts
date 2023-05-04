import dotenv from 'dotenv';
import connectDatabase from '@util/database';
import genresJson from '@data/genres.json';
import moviesjson from '@data/movies.json';
import cinemesJson from '@data/cinemas.json';

import { Genre, IGenre } from '@model/genre.model';
import { Movie, IMovie } from '@model/movie.model';
import { Cinema, ICinema } from '@model/cinema.model';

const genresData: IGenre[] = Object.assign([], genresJson);
const moviesData: IMovie[] = Object.assign([], moviesjson);
const cinemasdata: ICinema[] = Object.assign([], cinemesJson);

dotenv.config();
connectDatabase();

const seedGenres = async () => {
  try {
    await Genre.deleteMany();
    console.log('🍀 [db]: Genres are deleted.');
    const genres = await Genre.find();
    await Genre.insertMany(genresData);
    console.log('🍀 [db]: All Genres are added.');
  } catch( error: any ) {
    console.log(`❗ [server]: ${(error as Error).message}`)
  }
}

const seedMovies = async () => {
  try {
    await Movie.deleteMany();
    console.log('🍀 [db]: Movies are deleted.');
    await Movie.insertMany(moviesData);
    console.log('🍀 [db]: All Movies are added.');
  } catch( error: any ) {
    console.log(`❗ [server]: ${(error as Error).message}`)
  }
}

const seedCinemas = async () => {

}

const seedRefs = async () => {
  const genres = await Genre.find();
  const movies = await Movie.find();

  genres[1].movies.push( movies[2]._id )
  genres[5].movies.push( movies[1]._id, movies[2]._id )
  genres[9].movies.push( movies[0]._id, movies[1]._id, movies[2]._id )
  genres[11].movies.push( movies[0]._id, movies[1]._id )
  await genres.map((genre) => genre.save())

  movies[0].genres.push( genres[9]._id, genres[11]._id)
  movies[1].genres.push( genres[5]._id, genres[9]._id, genres[11]._id)
  movies[2].genres.push( genres[1]._id, genres[5]._id, genres[9]._id)
  await movies.map((movie) => movie.save())
}

const seedAlls = async () => {
  await Promise.all([
    seedGenres(),
    seedMovies(),
    seedCinemas()]
  )

  await seedRefs()
  console.log('🍀 [db]: All seeding is done.');
}

seedAlls()