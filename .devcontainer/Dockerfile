ARG VARIANT=18
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

RUN apt-get update
RUN apt-get install -y python3 libxi-dev libglu1-mesa-dev libglew-dev pkg-config

# Add 3.7 to the available alternatives
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1

# Set python3.7 as the default python
RUN update-alternatives --set python /usr/bin/python3
