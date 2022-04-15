# blog
My personal blog

## Development
Use this commad for development

```bash
hugo server -D
```

## Build
Before deploy

```bash
hugo -D
```

## Deploy

```bash
ansible-playbook ansible/push.yaml -i ansible/inventory.yaml
```