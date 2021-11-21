# -*- encoding: utf-8 -*-
# stub: require_all 3.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "require_all".freeze
  s.version = "3.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jarmo Pertman".freeze, "Tony Arcieri".freeze]
  s.date = "2019-10-22"
  s.email = "jarmo.p@gmail.com".freeze
  s.extra_rdoc_files = ["LICENSE".freeze, "README.md".freeze, "CHANGES.md".freeze]
  s.files = ["CHANGES.md".freeze, "LICENSE".freeze, "README.md".freeze]
  s.homepage = "http://github.com/jarmo/require_all".freeze
  s.licenses = ["MIT".freeze]
  s.rdoc_options = ["--title".freeze, "require_all".freeze, "--main".freeze, "README.md".freeze, "--line-numbers".freeze]
  s.rubygems_version = "3.1.6".freeze
  s.summary = "A wonderfully simple way to load your code".freeze

  s.installed_by_version = "3.1.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<rake>.freeze, ["~> 10.4"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.2"])
    s.add_development_dependency(%q<simplecov>.freeze, ["~> 0.7"])
  else
    s.add_dependency(%q<rake>.freeze, ["~> 10.4"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.2"])
    s.add_dependency(%q<simplecov>.freeze, ["~> 0.7"])
  end
end
