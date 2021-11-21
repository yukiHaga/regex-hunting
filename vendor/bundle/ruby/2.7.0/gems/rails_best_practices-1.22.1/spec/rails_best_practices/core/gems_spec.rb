# frozen_string_literal: true

require 'spec_helper'

module RailsBestPractices::Core
  describe Gems do
    it { is_expected.to be_a_kind_of Array }

    let(:gems) { described_class.new }
    before do
      gems << Gem.new('rails', '4.0.0')
      gems << Gem.new('mysql2', '0.2.0')
    end

    describe '#has_gem?' do
      it 'has rails gem' do
        expect(gems).to be_has_gem 'rails'
      end

      it "hasn't sinatra gem" do
        expect(gems).not_to be_has_gem 'sinatra'
      end
    end

    describe '#gem_version' do
      it 'gets rails version' do
        expect(gems.gem_version('rails')).to eq '4.0.0'
      end
    end
  end
end
