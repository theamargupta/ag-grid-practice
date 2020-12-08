import React from 'react';
import Head from 'next/head';

const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
