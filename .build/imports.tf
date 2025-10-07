data "aws_region" "current" {}


locals {
  extra_env_var = {
    for tuple in regexall("([^=]+)=(.+)", file("../.env")) :
    trimspace(tuple[0]) => trimspace(tuple[1])
    if !startswith(trimspace(tuple[0]), "#")
  }
}
