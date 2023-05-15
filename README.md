 <p align="center">
   <img  src="https://img.shields.io/badge/license-MIT-green">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/PeterHdd/pcer">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PeterHdd/pcer">
<img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/PeterHdd/pcer">
 </p>
 <br>
<p align="center">A CLI to make it easier to add certificates locally</p>
<br>

![image](https://github.com/PeterHdd/pcer/assets/29070108/3f127245-94f2-4e6d-b596-9e80d25f833a)


## Usage

The goal of this CLI is to make it easier to add certificates locally to your machine especially in Windows. 

If you are using a security software that acts as a proxy then you won't be able to execute `git clone` until you add the certificate of `gitlab.com` or `github.com` locally in your machine, and the certificates gets updated more than once so, this operation has to be done frequently. It basically solves this issue [Unable to get local issuer certificate](https://stackoverflow.com/questions/36494336/npm-install-error-unable-to-get-local-issuer-certificate).


## Commands

The command to use is `pcer` and then you can use the `--help` option to see a list of commands to use:

### Help

```
pcer --help

  ____     ____   _____   ____
 |  _ \   / ___| | ____| |  _ \
 | |_) | | |     |  _|   | |_) |
 |  __/  | |___  | |___  |  _ <
 |_|      \____| |_____| |_| \_\

Usage: pcer <command> [<args>] [--help]

Options:
  -v, --version            output the current version
  -h, --help               display help for command

Commands:
  add [options] <cert>     Add a certificate into the specified location
  alias <name> <location>  Add a alias to the specified location
  list                     list all alias
  remove <alias>           alias to be rmeoved
  help [command]           display help for command
```

### Alias

The `alias` command takes two argument, the name of the alias and the location. This name would be used when you want to add certificates to the specified location, which is in this case `bundle.crt`.

```
pcer alias git "C:\Program Files\Git\mingw64\etc\ssl\certs\ca-bundle.crt"

Successfully added alias
```
### List

The `list` command, will list all available aliases:

```
pcer list

git ----> C:\Program Files\Git\mingw64\etc\ssl\certs\ca-bundle.crt
```

### Remove

The `remove` command, will remove an alias that you have already added:

```
pcer remove git

Successfully deleted alias
```


### Add

The `add` command, will add your certificate locally to the file that you have specified when you created the alias. Make sure you use the `-l` flag and then you either specify a location like `"C:\Program Files\Git\mingw64\etc\ssl\certs\ca-bundle.crt"` or you just use the alias that you created, example `git`

```
pcer add C:/Users/p.haddad/Downloads/github.crt -l git


Certificate added successfully
```

## Support!

Support the repository by joining the [stargazers](https://github.com/PeterHdd/pcer/stargazers) for this repo ⭐

## License

Licensed under the [MIT License](https://github.com/PeterHdd/pcer/blob/main/LICENSE).
