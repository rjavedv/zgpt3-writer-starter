import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: "org-iVQ41YmUXddf15AGKMhfSqQJ",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Generate a spreadsheet with following information:";



const generateAction = async (req, res) => {
  // Run first prompt
  //console.log(`API: ${basePromptPrefix}${req.body.userInput}${req.body.userInput2}${req.body.userInput3} `)

  const finalPrompt =
    `
  ${basePromptPrefix}
  Title: ${req.body.userInput}
  Number of Columns : ${req.body.userInput2}
  Column Names: ${req.body.userInput3}
  `

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    //    prompt: `${basePromptPrefix}${req.body.userInput}`,
    prompt: `${finalPrompt}\n`,
    temperature: 0.7,
    max_tokens: 950,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;