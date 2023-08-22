import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';

async function run() {
  const { payload, runId, ref } = github.context;
  const branch = ref.split('/').at(-1);
  const isSuccess = true; // todo

  const embed = {
    timestamp: new Date().toISOString(),
    description: isSuccess ? '👍' : '',
    color: isSuccess ? 0x7fff00 : 0xff0000,
    title: `${payload.repository?.full_name}@${branch}`,
    fields: [
      {
        name: 'Commit',
        value: payload.head_commit ? `[${payload.head_commit.message}](${payload.head_commit.url})` : 'manual trigger',
      },
      {
        name: 'Action',
        value: `[${runId}](${payload.repository?.html_url}/actions/runs/${runId})`,
      },
    ],
    author: {
      name: payload.sender?.login,
      icon_url: payload.sender?.avatar_url,
      url: payload.sender?.url,
    },
    footer: {
      text: 'cloudticon',
    },
    provider: {
      name: 'github',
      url: 'https://github.com/',
    },
  };

  try {
    await axios.post(core.getInput('webhook'), {
      content: isSuccess ? undefined : '@everyone',
      embeds: [embed],
    });
  } catch (error) {
    core.setFailed(JSON.stringify(error));
  }
}

run();
