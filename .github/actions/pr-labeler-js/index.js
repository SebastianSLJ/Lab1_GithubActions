const core = require('@actions/core/lib/core');
const github = require('@actions/github/lib/github');

async function run() {
    try{
    const labelName = core.getInput('label-name');
    const token = core.getInput('github-token');

    const payload = github.context.payload;

    if(!payload.pull_request){
        throw new Error('This workflow must only be executed in pull_request events')
    }
    
    const prNumber = payload.pull_request.number;
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;

    const octokit = github.getOctokit(token);

    await octokit.rest.issues.addLabels({
        owner: owner,
        repo: repo,
        issue_number: prNumber,
        labels: [labelName],
    })

    core.setOutput('label-applied', labelName)
    console.log(`Etiqueta ${labelName} agregada con exito al PR #${prNumber}`)

}
catch(error){
    core.setFailed(error.message)

}

}

run();