import io from 'socket.io-client';
import feathers from '@feathersjs/client';

// Socket.io is exposed as the `io` global.
const socket = io('http://localhost:3030');
// @feathersjs/client is exposed as the `feathers` global.
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication());

app.service('v1/cards').create({
  text: 'Next connection'
});

const Index = props => (
  <ul>
    {props.cards.map(card => (
      <li key={card._id}>{card.text}</li>
    ))}
  </ul>
);

Index.getInitialProps = async function() {
  const cards = await app.service('v1/cards').find({query:{}});
  return {
    cards: cards.data
  };
};

export default Index
