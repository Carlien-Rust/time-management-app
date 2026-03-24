# Setup git connection

ls -al ~/.ssh 

cat ~/.ssh/id_work.pub

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGvMPEF0cLWod6NlRpQgW7TJu/GUmVfdXtYZOeVsa0+x carlien@octoco.ltd
```

git config core.sshCommand 'ssh -i ~/.ssh/id_work'

**Authenticate**

ssh -i ~/.ssh/id_work -T git@github.com

# Test

git remote -v
git remote set-url origin git@github.com:Carlien-Rust/time-management-app.git
git config user.name "Carlien Rust"
git config user.email "carlien@octoco.ltd"