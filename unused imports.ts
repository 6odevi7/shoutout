import io from 'socket.io-client';
import Document, { Html, Main, NextScript } from 'next/document';
import Home from '../components/Home';
import { RegisterForm, LoginForm } from '../components/AuthForms';
import ShoutoutFeed from '../client/components/ShoutoutFeed';
import StaticContent from '../components/StaticContent';
import DynamicContent from '../components/DynamicContent';
import dynamic from 'next/dynamic';
import { configureStore } from '@reduxjs/toolkit';
import dbConnect from '../utils/dbConnect';
import jwt from 'jsonwebtoken';
import OpenAI from 'openai';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Head from 'next/head';
import Image from 'next/image';
import { ServerStyleSheet, styled } from 'styled-components';
import { spotlightArea, shoutoutForm, aiInsightPost } from '../styles';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';