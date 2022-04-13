import React from 'react';
import ContentLoader from 'react-content-loader/native';

export function LoadingPlaceholder() {

  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={'30%'}
      viewBox='0 0 400 160'
      backgroundColor='#d9d9d9'
      foregroundColor='#ededed'
    >
      <rect x='50' y='6' rx='4' ry='4' width='343' height='24' />
      <rect x='8' y='6' rx='4' ry='4' width='24' height='24' />
      <rect x='50' y='55' rx='4' ry='4' width='343' height='24' />
      <rect x='8' y='55' rx='4' ry='4' width='24' height='24' />
      <rect x='50' y='104' rx='4' ry='4' width='343' height='24' />
      <rect x='8' y='104' rx='4' ry='4' width='24' height='24' />
    </ContentLoader>
  );
}
