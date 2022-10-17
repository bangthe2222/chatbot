const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  await nlp.save("model_v1.model")
  const response = await nlp.process('en', 'What is your name?');
  console.log(response['intent']);
})();