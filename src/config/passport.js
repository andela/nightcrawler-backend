/* eslint-disable no-underscore-dangle */
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import * as userServices from '../services/userServices';
import { googleConfig, fbConfig } from './constants';

passport.use(new GoogleStrategy(googleConfig,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userServices.findSingleUser({ email: profile._json.email });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

passport.use(new FacebookStrategy(fbConfig,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userServices.findSingleUser({ email: profile._json.email });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
