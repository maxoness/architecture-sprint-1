import React, { lazy } from 'react';

const AddPlaceButton = lazy(() => import('cards/AddPlaceButton').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const CardList = lazy(() => import('cards/CardList').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const Profile = lazy(() => import('user/Profile').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

function Main({ loggedIn }) {
  return (
    <main className="content">
      <section className="profile page__section">
        {loggedIn && (
          <Profile/>
        )}
      </section>
      <section className="places page__section">
        <CardList />
      </section>
    </main>
  );
}

export default Main;
