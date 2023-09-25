FROM python:3.9
ENV PYTHONUNBUFFERED 1

# install node
RUN apt-get update \
    && apt-get install -y ca-certificates curl gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# app user variables
ARG user=app
ARG group=docker
ARG home=/home/$user
ARG project=$home/shared-futures-space

# import from docker-compose - receive the current host user and their main group IDs
ARG USERID
ARG GROUPID

# create group and user with home directory
RUN addgroup --gid $GROUPID $group
RUN adduser -u $USERID --ingroup $group --home $home --disabled-password $user

# switch to new user
USER $user
ENV PATH="~/.local/bin:$PATH"

# create directory
RUN mkdir $project

# install requirements first
COPY requirements.txt $project/
RUN pip install -r $project/requirements.txt

# copy over the code onto the container
COPY . $project/

# come back as root to clean up
USER root

# all future commands should run as the user in river directory
USER $user
WORKDIR $project
