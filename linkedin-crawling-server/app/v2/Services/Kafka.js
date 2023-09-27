const { Kafka } = require('kafkajs')
const dotenv = require('dotenv');
const { logger } = require('../Helper/helper');
dotenv.config({ path: "../../../.env" });

const kafka = new Kafka({
   clientId: 'my-app',
   brokers: ['172.17.0.1:9092']
})
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'IN_TOPIC', sessionTimeout: 700000 });
(async () => {
   await consumer.connect();
   await consumer.subscribe({ topic: process.env.IN_TOPIC });
})();
const runProducer = async (data, topic) => {

   // Producing
   await producer.connect();
   await producer.send({
      topic: topic,
      messages: [
         { value: JSON.stringify(data) },
      ],
   });
   console.log(`${topic} producer done`);
};
const runConsumer = async (page, callback, topic) => {
   await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
         let topic_message = JSON.parse(message.value);
         logger.info("kafka::runConsumer");
         logger.info(topic_message.topic_type);
         if (topic_message) {
            await callback(topic_message, page);
         };
      },
   })
};



module.exports = {
   runProducer,
   runConsumer
}
// run(campaign).catch(console.error)