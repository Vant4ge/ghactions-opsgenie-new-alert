/*
 * Documentation: 
 *   OpsGenie API           -> https://docs.opsgenie.com/docs/alert-api
 *   OpsGenie NodeJS SDK    ->  https://docs.opsgenie.com/docs/opsgenie-nodejs-api
 *   GitHub NodeJS Template -> https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-javascript-action
 */
const core = require('@actions/core');
const github = require('@actions/github');
const opsGenie = require('opsgenie-sdk');

try 
{
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    const api_key = core.getInput('api-key');
    const subject = core.getInput('subject');
    const alias = core.getInput('alias');
    const priority = core.getInput('priority');
    const body = core.getInput('body');
    
    // Configure OpsGenie SDK
    opsGenie.configure({
        'api_key': api_key
    });

    // Create OpsGenie alert
    var create_alert_json = {
        'message': subject,
        'alias': alias,
        'priority': priority,
        'description': body
    };

    opsGenie.alertV2.create(create_alert_json, function (error, alert) {
        if (error) {
            console.error(error);
            core.setFailed(error);
        } else {
            console.log(alert);
        }
    });
} catch (error) {
    console.error(error.message);
    core.setFailed(error.message);
}