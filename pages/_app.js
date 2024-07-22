import React, { useState, useEffect, useRef, Suspense } from 'react';
import io from 'socket.io-client';
import Document, { Html, Main, NextScript } from 'next/document';
import Home from '../components/Home';
import { RegisterForm, LoginForm } from '../components/AuthForms';
import ShoutoutFeed from '../client/components/ShoutoutFeed';
import StaticContent from '../components/StaticContent';
import DynamicContent from '../components/DynamicContent';
const SpotlightArea = dynamic(() => import('../components/features/SpotlightArea'));
const ShoutoutForm = dynamic(() => import('../components/layout/shared/ShoutoutForm'));
const AIInsightPost = dynamic(() => import('../components/features/AIInsightPost'));
const DynamicShoutoutFeed = dynamic(() => import('../components/layout/shared/ShoutoutFeed'));
import dynamic from 'next/dynamic';
import { configureStore } from '@reduxjs/toolkit';
import dbConnect from '../utils/dbConnect';
import jwt from 'jsonwebtoken';
import OpenAI from 'openai';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Head from 'next/head';
import Image from 'next/image';
import '../styles/hackertheme.css';
import { ServerStyleSheet, styled } from 'styled-components';
import { spotlightArea, shoutoutForm, aiInsightPost } from '../styles';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

