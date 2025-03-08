import React, { lazy } from 'react';

const CardList = lazy(() => import('cards/CardList').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

const Profile = lazy(() => import('user/Profile').catch(() => {
    return {default: () => <div className='error'>Component is not available!</div>};
  })
);

function Main({isLoggedIn, currentUser, setCurrentUser}) {
  return (
    <>
    <main className="content">
      <section className="profile page__section">
        {
          isLoggedIn && (
          <Profile currentUser={currentUser} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} />
    )}
      </section>
      <section className="places page__section">
        {isLoggedIn && (
        <CardList />
        )}
      </section>
    </main>
    </>
  );
}

export default Main;
