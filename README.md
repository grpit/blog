This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development
First, run the backend development server:

```bash
npm run server-dev
# or
yarn server-dev
```

Now run the development server for frontend in a new terminal
```bash
npm run dev
# or
yarn dev
```

## Learn More

To learn more about the stacks used in the project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Get HTTPS certificate
You will need a self signed certificate to run local development server with **HTTP2**. The certificate file names can be changed from the .env file. The following will guide you through to get a self signed certificate -
### Certificate Authority
1. Generate a private key and self-signed certificate:

```bash
openssl req -x509 -nodes -new -sha512 \
  -days 365 -newkey rsa:4096 -keyout ca.key \
  -out ca.pem -subj "/C=IN/CN=MY-CA"
```

2. Create a .crt certificate file:
```bash
openssl x509 -outform pem -in ca.pem -out ca.crt
```
### Domain name certificate file

1. Generate v3 file with localhost and alternate names
```bash
cat > v3.ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
# Local hosts
DNS.1 = localhost
DNS.2 = 127.0.0.1
# List your domain names here
DNS.4 = local.dev
EOF
```

2. Get Private key and certificate sign request
```bash
openssl req -new -nodes -newkey rsa:4096 \
  -keyout localhost.key -out localhost.csr \
  -subj "/C=IN/ST=State/L=City/O=Some-Organization-Name/CN=localhost"
```

3. Generate a self signed certificate
```bash
openssl x509 -req -sha512 -days 365 \
  -extfile v3.ext \
  -CA ca.crt -CAkey ca.key -CAcreateserial \
  -in localhost.csr \
  -out localhost.crt
```

To get it running in localhost successfully this certificate needs to be trusted by your machine. To add this certificate double-click the certificate (ca.crt) and add it to your login (or system if you want to use it accross different users). This will then show up on the keychain. Double click again and change the "Trust" permissions to "Always Trust".
