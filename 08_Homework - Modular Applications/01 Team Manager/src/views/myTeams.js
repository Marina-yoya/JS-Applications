import { getMyTeams } from '../api/data.js';
import { teamTemplate } from './common/team.js';
import { loaderTemplate } from './common/loader.js';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';

const myTeamsTemplate = (teams) => html`
    <section id="my-teams">
        <article class="pad-med">
            <h1>My Teams</h1>
        </article>

        ${teams.length
            ? teams.map(teamTemplate)
            : html` <article class="layout narrow">
                  <div class="pad-med">
                      <p>You are not a member of any team yet.</p>
                      <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own team.</p>
                  </div>
                  <div class=""><a href="/create" class="action cta">Create Team</a></div>
              </article>`}
    </section>
`;

export default async function myTeamsPage(ctx) {
    ctx.render(until(populateTemplate(), loaderTemplate()));
}

async function populateTemplate() {
    const teams = await getMyTeams();
    return myTeamsTemplate(teams);
}
