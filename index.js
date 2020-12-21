/*
 * Documentation: 
 *   OpsGenie API           -> https://docs.opsgenie.com/docs/alert-api
 *   OpsGenie NodeJS SDK    ->  https://docs.opsgenie.com/docs/opsgenie-nodejs-api
 *   GitHub NodeJS Template -> https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-javascript-action
 */
const core = require('@actions/core');
const opsGenie = require('opsgenie-sdk');

try 
{
    const api_key = core.getInput('api-key');
    const subject = core.getInput('subject');
    const alias = core.getInput('alias');
    const priority = core.getInput('priority');
    const body = core.getInput('body');
    const details = core.getInput('details') ?? {};
    const tags = core.getInput('tags') ?? [];
    
    // Configure OpsGenie SDK
    opsGenie.configure({
        'api_key': api_key
    });

    // Create OpsGenie alert
    var create_alert_json = {
        'message': subject,
        'alias': alias,
        'priority': priority,
        'description': body,
        'details': details,
        'tags': tags
    };

    opsGenie.alertV2.create(create_alert_json, function (error, alert) {
        if (error) {
            console.error(error);
        } else {
            console.log(alert);
        }
    });
} catch (error) {
    core.setFailed(error.message);
}