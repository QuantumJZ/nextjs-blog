
import '../styles/globals.css';
import React from 'react';
import App from 'next/app';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Replace with the appropriate ID of the root element (div) in your index.html or _document.js

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;