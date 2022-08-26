import {
  fillCards,
  updateCard,
  updateCards,
  deleteCards,
  CardsSelector,
} from '../redux/Cards/CardsSlice';
import {
  editScore,
  editStatus,
  editTotal,
  AppSelector,
} from '../redux/App/AppSlice';
import { jokerSuprise } from '../utils/utils';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
import shuffle from 'shuffle-array';
import cardList from '../helpers/cardList.json';

const dispatch = store.dispatch;

export function getAppState() {
  return useSelector((state) => AppSelector.selectById(state, 0));
}

export function getCardsState() {
  return useSelector(CardsSelector.selectAll);
}

export function setCards() {
  dispatch(fillCards(shuffle(cardList)));
}

export function resetApp() {
  dispatch(
    editTotal({
      id: 0,
      changes: {
        score: 200,
        status: 'Playing',
        activeCards: [],
        total: {
          correct: 0,
          opened: 0,
          closed: 25,
          all: 25,
        },
      },
    })
  );

  dispatch(deleteCards());
  setCards();
}

export function openCard(card) {
  const state = store.getState().app.entities[0];

  dispatch(updateCard({ id: card.id, changes: { status: 'opened' } }));

  if (card.title === 'Joker') {
    jokerSuprise();
    return;
  }

  dispatch(
    editTotal({
      id: state.id,
      changes: {
        status: 'Selecting',
        total: {
          ...state.total,
          opened: state.total.opened + 1,
          closed: state.total.closed - 1,
        },
        activeCards: [...state.activeCards, card],
      },
    })
  );

  checkMatch([...state.activeCards, card]);
}

export function closeCard(card) {
  if (card.title === 'Joker') return;
  const state = store.getState().app.entities[0];

  dispatch(updateCard({ id: card.id, changes: { status: 'closed' } }));
  dispatch(
    editTotal({
      id: state.id,
      changes: {
        total: {
          ...state.total,
          opened: state.total.opened - 1,
          closed: state.total.closed + 1,
        },
        activeCards: state.activeCards.filter(
          (activeCard) => activeCard.id !== card.id
        ),
      },
    })
  );
}

export function toggleCard(card) {
  const state = store.getState().app.entities[0];
  if (state.status !== 'Playing' && state.status !== 'Selecting') return;
  if (card.status === 'done') return;

  if (card.status === 'opened') {
    closeCard(card);
    return;
  }

  openCard(card);
}

export function checkMatch(cards) {
  if (cards.length < 2 || cards[0].id === cards[1].id) {
    return;
  }

  if (cards[0].title !== cards[1].title) {
    failMatch(cards);
    return;
  }

  correctMatch(cards);
}

export function correctMatch(cards) {
  const state = store.getState().app.entities[0];

  dispatch(
    editStatus({
      id: state.id,
      changes: {
        status: 'Correct Match!',
      },
    })
  );

  setTimeout(() => {
    dispatch(
      editScore({
        id: state.id,
        changes: {
          score: state.score + 50,
          activeCards: [],
        },
      })
    );

    dispatch(
      editTotal({
        id: state.id,
        changes: {
          total: { ...state.total, correct: state.total.correct + 1 },
        },
      })
    );

    dispatch(
      updateCards(
        cards.map((card) => ({
          id: card.id,
          changes: {
            status: 'done',
          },
        }))
      )
    );
  }, 1000);

  setTimeout(() => {
    dispatch(
      editStatus({
        id: state.id,
        changes: {
          status: 'Playing',
        },
      })
    );
  }, 1000);
}

export function failMatch(cards) {
  const state = store.getState().app.entities[0];

  dispatch(
    editStatus({
      id: state.id,
      changes: {
        status: 'Wrong Match!',
      },
    })
  );

  dispatch(
    updateCards(
      cards.map((card) => ({
        id: card.id,
        changes: {
          status: 'temporaryDisabled',
        },
      }))
    )
  );

  setTimeout(() => {
    dispatch(
      editScore({
        id: state.id,
        changes: {
          score: state.score - 10,
          activeCards: [],
        },
      })
    );

    cards.forEach((card) => closeCard(card));
  }, 1000);

  setTimeout(() => {
    dispatch(
      editStatus({
        id: state.id,
        changes: {
          status: 'Playing',
        },
      })
    );
  }, 1000);
}
