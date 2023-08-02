const { Conversations, Participants, Messages } = require("../models");

const createConversation = async (req, res, next) => {
  try {
    // body: { createdBy: 2, participant: 4  }
    const { createdBy, participants, type } = req.body;
    // crear la conversacion
    const conversation = await Conversations.create({ createdBy, type });
    // conversation = { id, title, creattedBy, type, createdAt, updatedAt}
    // tomar el id de la conversacion creada y agreagar a los participantes
    const { id } = conversation;
    // agregar a los participantes en la tabla pivote
    const participitantsArray = participants.map((participant) => ({
      userId: participant,
      conversationId: id,
    }));
    participitantsArray.push({ userId: createdBy, conversationId: id });
    await Participants.bulkCreate(participitantsArray);

    res.status(201).end();
  } catch (error) {
    next(error);
  }
};


const createMessage = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {content, senderId} = req.body;
    const newMessage = {
      conversationId: Number(id),
      content: content,
      senderId: senderId
    }

    const message = await Messages.create(newMessage);

    res.status(201).json(message)
  } catch (error) {
    next(error)
  }
}

const getInfoConversation = async (req, res, next) => {
  try {
    const {id} = req.params;

    const participants = await Participants.findAll({
      where: {
        conversationId: id
      },
       include: Conversations
    })

    const messages = await Messages.findAll({
      where: {
        conversationId: id
      }
    })

    res.json({
      participants: participants,
      messages: messages
    })
  } catch (error) {
    next(error)
  }
}

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    // antes de eliminar la conversacion 3
    // elimino todos los registros en participantes que usen ese id
    await Conversations.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  deleteConversation,
  createMessage,
  getInfoConversation
};

// [3, 5, 7, 8, 9]
// tranformar el arreglo de participantes
/* 
[
  { userId: 3, conversationId: id },
  { userId: 5, conversationId: id },
  { userId: 7, conversationId: id },
  { userId: 8, conversationId: id },
  { userId: 9, conversationId: id }
]

const participats = participatns.map(participant => (
  {userId: participant, conversationId: id}
));


*/