# OpsGenie SDK Alert System for GitHub Actions

OpsGenie action to use the current OpsGenie API to create alerts using the OpsGenie NodeJS SDK

## Inputs

These are the supported parameters from the OpsGenie SDK that are currently implemented. 

### Required 

* apikey - OpsGenie Integration API Key
* priority - Priority for the alert must be a valid OpsGenie Priority (P1-P5 currently and must be uppercase)
* alias - Unique ID for the alert to prevent duplicate alerts. I suggest using the GitHub Project ID with the Action Run ID. (max 512 chars)
* subject - Alert subject to send to OpsGenie (max 130 chars)
* body - Alert description to send to OpsGenie (max 15K chars)

## Example usage

`
- name: Send notification to OpsGenie on job failure
  if: ${{ failure() }}
  uses: Vant4ge/ghactions-opsgenie-new-alert@v0.0.7
  with:
    apikey: ${{ secrets.OPSGENIE_API_KEY }}
    alias: ${{ github.repository }}_${{ github.job }}_${{ github.run_id }}
    priority: P3
    subject: "GitHub Action Failed - ${{ github.repository }} in job ${{ github.job }}."
    body: "Failure occurred processing job ${{ github.job }} in repo ${{ github.repository }}. Link to job execution: https://github.com/${{ github.repository }}/runs/${{ github.run_id }}"
`

## Compile for use by GitHub Actions

1. Install ncc: npm i -g @vercel/ncc
2. Compile: ncc build index.js --license licenses.txt
3. Make sure you are committing the Dist folder